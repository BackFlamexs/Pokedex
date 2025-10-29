// ============================================================================
// CAMADA CONTROLLER - PokedexController.js
// ============================================================================
// Responsável por orquestrar toda a aplicação
// Coordena a comunicação entre Service (API), Model (estado) e View (componentes)
// ============================================================================

// Importa o serviço de API para fazer requisições
import * as API from '../service/PokeAPIService.js';

// Importa o modelo para gerenciar o estado global
import * as Model from '../model/PokemonModel.js';

// Importa os componentes da interface
import SearchBar from '../molecules/SearchBar.js';
import PokemonList from '../organisms/PokemonList.js';
import PokemonDetail from '../organisms/PokemonDetail.js';
import Button from '../atoms/Button.js';

// ============================================================================
// SELETORES DO DOM
// ============================================================================

// Seleciona o elemento #app-header onde o cabeçalho será montado
const rootHeader = document.getElementById('app-header');

// Seleciona o elemento #app-main onde a lista e detalhes serão montados
const rootMain = document.getElementById('app-main');

// ============================================================================
// OBJETO CONTROLLER
// ============================================================================

const PokedexController = {
  // Propriedade para armazenar o tipo ativo (filtro)
  // Inicialmente vazio (sem filtro)
  activeType: '',

  // ========================================================================
  // MÉTODO: init
  // Inicializa a aplicação: monta a interface e carrega dados iniciais
  // ========================================================================
  async init(){
    // ====================================================================
    // MONTAGEM DO HEADER
    // ====================================================================
    
    // Cria o elemento <header> que conterá título e barra de busca
    const header = document.createElement('header');
    header.className = 'header';
    
    // Cria um container <div> para o título
    const title = document.createElement('div');
    title.className = 'title';
    
    // Cria o elemento <h1> com o título principal
    const h = document.createElement('h1');
    h.textContent = 'Pokédex';
    
    // Cria o elemento <p> com o subtítulo
    const p = document.createElement('p');
    p.textContent = 'Modelo Atômico';
    
    // Adiciona h1 e p ao container de título
    title.append(h, p);
    
    // ====================================================================
    // CARREGAMENTO DE TIPOS E MONTAGEM DA BARRA DE BUSCA
    // ====================================================================
    
    // Busca a lista de tipos (categorias) na API
    const typesData = await API.fetchTypes();
    
    // Extrai apenas os nomes dos tipos e ordena alfabeticamente
    // typesData.results é um array de { name, url }
    // .map(t=>t.name) extrai apenas os nomes
    // .sort() ordena alfabeticamente
    const typeNames = (typesData.results || []).map(t=>t.name).sort();
    
    // Cria a barra de busca com:
    //   - onSearch: função a executar ao buscar por nome/ID
    //   - onFilterType: função a executar ao mudar o tipo
    //   - types: lista de tipos para popular o seletor
    const search = SearchBar({
      onSearch: this.handleSearch.bind(this),
      onFilterType: this.handleFilterType.bind(this),
      types: typeNames
    });
    
    // Adiciona título e barra de busca ao header
    header.append(title, search.el);
    
    // Adiciona o header ao DOM
    rootHeader.appendChild(header);

    // ====================================================================
    // MONTAGEM DA LISTA E PAINEL DE DETALHES
    // ====================================================================
    
    // Cria o organismo de lista de pokémons
    this.list = PokemonList();
    
    // Adiciona a lista ao DOM
    rootMain.appendChild(this.list.el);
    
    // Cria o organismo de painel de detalhes
    this.detail = PokemonDetail();
    
    // Adiciona o painel de detalhes ao DOM
    rootMain.appendChild(this.detail.el);

    // ====================================================================
    // MONTAGEM DOS BOTÕES DE PAGINAÇÃO
    // ====================================================================
    
    // Cria um container <div> para os botões de paginação
    const pagWrap = document.createElement('div');
    pagWrap.className = 'pagination';
    
    // Cria o botão "Anterior"
    // Ao clicar, reduz o offset (volta uma página)
    const prev = Button({
      text:'Anterior',
      onClick: async ()=>{
        // Math.max garante que offset não fique negativo
        Model.State.offset = Math.max(0, Model.State.offset - Model.State.limit);
        // Recarrega a página
        await this.loadPage();
      }
    });
    
    // Cria o botão "Próximo"
    // Ao clicar, aumenta o offset (avança uma página)
    const next = Button({
      text:'Próximo',
      onClick: async ()=>{
        // Aumenta o offset
        Model.State.offset = Model.State.offset + Model.State.limit;
        // Recarrega a página
        await this.loadPage();
      }
    });
    
    // Desabilita o botão "Anterior" inicialmente (já está na primeira página)
    prev.disabled = true;
    
    // Adiciona os botões ao container
    pagWrap.append(prev, next);
    
    // Adiciona o container de paginação ao DOM
    rootMain.appendChild(pagWrap);
    
    // Salva referências aos botões para manipular depois
    this.prevBtn = prev;
    this.nextBtn = next;

    // ====================================================================
    // CARREGAMENTO INICIAL
    // ====================================================================
    
    // Carrega a primeira página de pokémons
    await this.loadPage();
  },

  // ========================================================================
  // MÉTODO: loadPage
  // Carrega pokémons para a página atual
  // Se houver filtro de tipo, carrega pokémons daquele tipo
  // Caso contrário, usa a paginação padrão da API
  // ========================================================================
  async loadPage(){
    try{
      // ================================================================
      // CASO 1: FILTRO DE TIPO ATIVO
      // ================================================================
      
      // Verifica se há um tipo selecionado e se não é vazio
      if (this.activeType && this.activeType !== '') {
        // Busca todos os nomes de pokémons daquele tipo
        const names = await API.fetchPokemonByType(this.activeType);
        
        // Aplica paginação local: pega apenas os pokémons da página atual
        // slice(offset, offset+limit) extrai um pedaço do array
        // Exemplo: slice(0, 20) pega os primeiros 20
        const limited = names.slice(Model.State.offset, Model.State.offset + Model.State.limit);
        
        // Para cada nome, busca os dados completos do pokémon
        // Promise.all aguarda todas as requisições terminarem
        const items = await Promise.all(limited.map(async name=>{
          // Busca o pokémon completo pela API
          const d = await API.fetchPokemonByNameOrId(name);
          
          // Retorna um objeto com os dados formatados
          return {
            id: d.id,                                                                    // ID do pokémon
            name: d.name,                                                                // Nome do pokémon
            // Tenta obter a imagem oficial; se não existir, usa sprite padrão; se falhar, usa placeholder
            image: (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || 'assets/placeholder.png',
            // Extrai apenas os nomes dos tipos
            types: d.types.map(t=>t.type.name),
            // Armazena os dados completos para usar no painel de detalhes (stats, etc.)
            raw: d
          };
        }));
        
        // Atualiza o estado com o total de pokémons daquele tipo
        Model.setPagination({total: names.length});
        
        // Atualiza a lista no estado
        Model.setList(items);
        
        // Renderiza a lista na tela
        this.renderList();
        
        // Sai da função (não executa o caso 2)
        return;
      }

      // ================================================================
      // CASO 2: SEM FILTRO (PAGINAÇÃO PADRÃO)
      // ================================================================
      
      // Busca a página de pokémons da API
      const listResp = await API.fetchPokemonList(Model.State.limit, Model.State.offset);
      
      // Atualiza o estado com o total de pokémons
      Model.setPagination({total: listResp.count});
      
      // Para cada pokémon da lista, busca os dados completos
      const items = await Promise.all(listResp.results.map(async r=>{
        // Busca o pokémon completo
        const d = await API.fetchPokemonByNameOrId(r.name);
        
        // Retorna um objeto com os dados formatados
        return {
          id: d.id,
          name: d.name,
          image: (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || 'assets/placeholder.png',
          types: d.types.map(t=>t.type.name),
          raw: d
        };
      }));
      
      // Atualiza a lista no estado
      Model.setList(items);
      
      // Renderiza a lista na tela
      this.renderList();
      
    }catch(err){
      // Se houver erro, exibe mensagem de erro no DOM
      rootMain.innerHTML = `<div class="muted">Erro: ${err.message}</div>`;
    }
  },

  // ========================================================================
  // MÉTODO: renderList
  // Renderiza a lista de pokémons e atualiza o estado dos botões
  // ========================================================================
  renderList(){
    // Renderiza a lista passando os pokémons e a função de seleção
    this.list.render(Model.State.pokemons, this.handleSelect.bind(this));
    
    // Desabilita o botão "Anterior" se estamos na primeira página
    // offset === 0 significa que estamos no início
    this.prevBtn.disabled = Model.State.offset === 0;
  },

  // ========================================================================
  // MÉTODO: handleSearch
  // Executa quando o usuário busca por nome ou ID
  // Parâmetro:
  //   - term: nome ou ID do pokémon a buscar
  // ========================================================================
  async handleSearch(term){
    // Limpa o filtro de tipo ao buscar por termo
    // Isso garante que a busca não seja filtrada por tipo
    this.activeType = '';
    
    // Se o termo estiver vazio, carrega a página normal
    if(!term) return this.loadPage();
    
    try{
      // Busca o pokémon pela API
      const data = await API.fetchPokemonByNameOrId(term);
      
      // Monta o objeto com os dados formatados
      const obj = { 
        id: data.id,
        name: data.name,
        image: (data.sprites?.other?.['official-artwork']?.front_default) || data.sprites?.front_default || 'assets/placeholder.png',
        types: data.types.map(t=>t.type.name),
        raw: data 
      };
      
      // Atualiza o estado com o pokémon selecionado
      Model.setSelected(obj);
      
      // Exibe o painel de detalhes do pokémon
      this.detail.show(obj);
      
    }catch(err){
      // Se não encontrar, exibe alerta
      alert('Não encontrado: ' + err.message);
    }
  },

  // ========================================================================
  // MÉTODO: handleSelect
  // Executa quando o usuário clica em um card de pokémon
  // Parâmetro:
  //   - pokemon: objeto do pokémon clicado
  // ========================================================================
  handleSelect(pokemon){
    // Atualiza o estado com o pokémon selecionado
    Model.setSelected(pokemon);
    
    // Exibe o painel de detalhes
    this.detail.show(pokemon);
  },

  // ========================================================================
  // MÉTODO: handleFilterType
  // Executa quando o usuário muda o tipo no seletor
  // Parâmetro:
  //   - type: nome do tipo selecionado (vazio se "Todos os tipos")
  // ========================================================================
  async handleFilterType(type){
    // Salva o tipo ativo
    this.activeType = type;
    
    // Reseta a paginação para a primeira página
    Model.State.offset = 0;
    
    // Recarrega a página com o novo filtro
    await this.loadPage();
  }
};

// Exporta o controller para ser usado em main.js
export default PokedexController;
