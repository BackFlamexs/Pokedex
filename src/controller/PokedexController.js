
// Importa o serviço de API para fazer requisições
import * as API from '../service/PokeAPIService.js';

// Importa o modelo para gerenciar o estado global
import * as Model from '../model/PokemonModel.js';

// Importa os componentes da interface
import SearchBar from '../molecules/SearchBar.js';
import PokemonList from '../organisms/PokemonList.js';
import PokemonDetail from '../organisms/PokemonDetail.js';
import Button from '../atoms/Button.js';


// Seleciona o elemento #app-header onde o cabeçalho será montado
const rootHeader = document.getElementById('app-header');

// Seleciona o elemento #app-main onde a lista e detalhes serão montados
const rootMain = document.getElementById('app-main');

const PokedexController = {

  activeType: '',

  async init(){

    
    // Cria o elemento <header> que conterá título e barra de busca
    const header = document.createElement('header');
    header.className = 'header';
    
    const title = document.createElement('div');
    title.className = 'title';
    
    const h = document.createElement('h1');
    h.textContent = 'Pokédex';

    const p = document.createElement('p');
    p.textContent = 'Modelo Atômico';

    title.append(h, p);

    const typesData = await API.fetchTypes();
    
    // Extrai apenas os nomes dos tipos e ordena alfabeticamente
    // typesData.results é um array de  name, url 
    // .map(t=>t.name) extrai apenas os nomes
    // .sort() ordena alfabeticamente
    const typeNames = (typesData.results || []).map(t=>t.name).sort();

    //   - onSearch: função a executar ao buscar por nome/ID
    const search = SearchBar({
      onSearch: this.handleSearch.bind(this),
      onFilterType: this.handleFilterType.bind(this),
      types: typeNames
    });
    

    header.append(title, search.el);
    

    rootHeader.appendChild(header);
    

    this.list = PokemonList();

    rootMain.appendChild(this.list.el);

    this.detail = PokemonDetail();

    rootMain.appendChild(this.detail.el);

    const pagWrap = document.createElement('div');
    pagWrap.className = 'pagination';
    
    // Cria o botão "Anterior"
    const prev = Button({
      text:'Anterior',
      onClick: async ()=>{
        Model.State.offset = Math.max(0, Model.State.offset - Model.State.limit);
        await this.loadPage();
      }
    });
    
    // Cria o botão "Próximo"
    const next = Button({
      text:'Próximo',
      onClick: async ()=>{

        Model.State.offset = Model.State.offset + Model.State.limit;
        await this.loadPage();
      }
    });
    

    prev.disabled = true;
    

    pagWrap.append(prev, next);

    rootMain.appendChild(pagWrap);
    

    this.prevBtn = prev;
    this.nextBtn = next;

    await this.loadPage();
  },



  async loadPage(){
    try{
      // Verifica se há um tipo selecionado e se não é vazio
      if (this.activeType && this.activeType !== '') {
        // Busca todos os nomes de pokémons daquele tipo
        const names = await API.fetchPokemonByType(this.activeType);

        const limited = names.slice(Model.State.offset, Model.State.offset + Model.State.limit);
        

        const items = await Promise.all(limited.map(async name=>{
          // Busca o pokémon completo pela API
          const d = await API.fetchPokemonByNameOrId(name);
          
          // Retorna um objeto com os dados formatados
          return {
            id: d.id,                                                                    
            name: d.name,                                                                

            image: (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || 'assets/placeholder.png',

            types: d.types.map(t=>t.type.name),

            raw: d
          };
        }));
        
        // Atualiza o estado com o total de pokémons daquele tipo
        Model.setPagination({total: names.length});
        
        Model.setList(items);
        
        this.renderList();
        
        return;
      }

      // Busca a página de pokémons da API
      const listResp = await API.fetchPokemonList(Model.State.limit, Model.State.offset);
      
      // Atualiza o estado com o total de pokémons
      Model.setPagination({total: listResp.count});
      
      const items = await Promise.all(listResp.results.map(async r=>{

        const d = await API.fetchPokemonByNameOrId(r.name);
        
        return {
          id: d.id,
          name: d.name,
          image: (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || 'assets/placeholder.png',
          types: d.types.map(t=>t.type.name),
          raw: d
        };
      }));
      

      Model.setList(items);
      

      this.renderList();
      
    }catch(err){
      // Se houver erro, exibe mensagem de erro no DOM
      rootMain.innerHTML = `<div class="muted">Erro: ${err.message}</div>`;
    }
  },

  renderList(){

    this.list.render(Model.State.pokemons, this.handleSelect.bind(this));

    this.prevBtn.disabled = Model.State.offset === 0;
  },


  async handleSearch(term){
    // Limpa o filtro de tipo ao buscar por termo
    this.activeType = '';
    

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
      

      Model.setSelected(obj);
      

      this.detail.show(obj);
      
    }catch(err){
      // Se não encontrar, exibe alerta
      alert('Não encontrado: ' + err.message);
    }
  },

  handleSelect(pokemon){
    // Atualiza o estado com o pokémon selecionado
    Model.setSelected(pokemon);
    
    // Exibe o painel de detalhes
    this.detail.show(pokemon);
  },

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
