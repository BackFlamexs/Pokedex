// ============================================================================
// COMPONENTE ORGANISMO - PokemonDetail.js
// ============================================================================
// Um painel de detalhes é um organismo: exibe informações completas de um pokémon
// Mostra imagem grande, tipos, stats e outros dados
// ============================================================================

// ============================================================================
// FUNÇÃO: PokemonDetail
// Cria e retorna um organismo que gerencia o painel de detalhes
// Retorna: objeto com { el, show, hide } onde:
//   - el: elemento <aside> que contém o painel
//   - show: função para exibir detalhes de um pokémon
//   - hide: função para ocultar o painel
// ============================================================================
export default function PokemonDetail(){
  // Cria um elemento <aside> para o painel de detalhes
  const panel = document.createElement('aside');
  
  // Define a classe CSS para estilização
  panel.className = 'detail';
  
  // Inicialmente oculta o painel (display:none)
  // Será exibido quando um pokémon for selecionado
  panel.style.display = 'none';
  
  // Retorna um objeto com métodos e propriedades
  return {
    // Propriedade: elemento do DOM que será adicionado à página
    el: panel,
    
    // ====================================================================
    // MÉTODO: show
    // Exibe o painel com detalhes de um pokémon
    // Parâmetro:
    //   - pokemon: objeto com { id, name, image, types, raw }
    //              raw contém os dados completos da API (incluindo stats)
    // ====================================================================
    show(pokemon){
      // Exibe o painel (muda display de 'none' para 'block')
      this.el.style.display = 'block';
      
      // Limpa o conteúdo anterior do painel
      this.el.innerHTML = '';

      // ================================================================
      // TÍTULO (ID E NOME)
      // ================================================================
      
      // Cria um elemento <h2> para o título
      const title = document.createElement('h2');
      
      // Define o conteúdo: #ID nome (ex: "#25 pikachu")
      title.textContent = `#${pokemon.id} ${pokemon.name}`;
      
      // Aplica CSS inline para capitalizar o nome
      title.style.textTransform = 'capitalize';

      // ================================================================
      // IMAGEM GRANDE
      // ================================================================
      
      // Cria um elemento <img> para exibir a imagem grande
      const img = document.createElement('img');
      
      // Define a URL da imagem
      img.src = pokemon.image;
      
      // Define o texto alternativo
      img.alt = pokemon.name;
      
      // Aplica CSS inline para dimensionar e centralizar a imagem
      img.style.width = '160px';           // Largura
      img.style.display = 'block';         // Exibe como bloco
      img.style.margin = '8px auto';       // Centraliza com margem

      // ================================================================
      // TIPOS (CATEGORIAS)
      // ================================================================
      
      // Cria um container <div> para os tipos
      const types = document.createElement('div');
      
      // Define a classe CSS
      types.className = 'types';
      
      // Itera sobre cada tipo do pokémon
      (pokemon.types || []).forEach(t=>{
        // Cria um elemento <span> para cada tipo
        const s = document.createElement('span');
        
        // Define a classe CSS
        s.className = 'type';
        
        // Define o texto do tipo
        s.textContent = t;
        
        // Adiciona o tipo ao container
        types.appendChild(s);
      });

      // ================================================================
      // STATS (ATRIBUTOS)
      // ================================================================
      
      // Cria um container <div> para os stats
      const statsWrap = document.createElement('div');
      
      // Verifica se existem stats no objeto raw (dados completos da API)
      if(pokemon.raw && pokemon.raw.stats){
        // Itera sobre cada stat (hp, attack, defense, etc.)
        pokemon.raw.stats.forEach(s=>{
          // Cria um elemento <div> para cada linha de stat
          const r = document.createElement('div');
          
          // Define a classe CSS
          r.className = 'stat-row';
          
          // Define o conteúdo HTML com nome do stat e valor
          // Exemplo: "<span>hp</span><strong>45</strong>"
          r.innerHTML = `<span>${s.stat.name}</span><strong>${s.base_stat}</strong>`;
          
          // Adiciona a linha ao container de stats
          statsWrap.appendChild(r);
        });
      } else {
        // Se não houver stats, exibe mensagem
        const no = document.createElement('div');
        
        // Define a classe CSS para texto muted (cinzento)
        no.className = 'muted';
        
        // Define o texto
        no.textContent = 'Sem stats.';
        
        // Adiciona a mensagem ao container
        statsWrap.appendChild(no);
      }

      // ================================================================
      // BOTÃO FECHAR
      // ================================================================
      
      // Cria um botão <button> para fechar o painel
      const close = document.createElement('button');
      
      // Define a classe CSS
      close.className = 'btn';
      
      // Define o texto do botão
      close.textContent = 'Fechar';
      
      // Adiciona um listener de clique para fechar o painel
      close.addEventListener('click', ()=> this.hide());

      // ================================================================
      // MONTAGEM FINAL
      // ================================================================
      
      // Adiciona todos os elementos ao painel na ordem desejada
      this.el.append(title, img, types, statsWrap, close);
    },
    
    // ====================================================================
    // MÉTODO: hide
    // Oculta o painel de detalhes
    // ====================================================================
    hide(){
      // Oculta o painel (muda display para 'none')
      this.el.style.display = 'none';
    }
  };
}
