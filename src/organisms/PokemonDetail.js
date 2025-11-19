export default function PokemonDetail(){
  // Cria um elemento <aside> para o painel de detalhes
  const panel = document.createElement('aside');
  
  // Define a classe CSS para estilização
  panel.className = 'detail';

  panel.style.display = 'none';
  
  // Retorna um objeto com métodos e propriedades
  return {

    el: panel,
    

    show(pokemon){
      // Exibe o painel (muda display de 'none' para 'block')
      this.el.style.display = 'block';
      
      // Limpa o conteúdo anterior do painel
      this.el.innerHTML = '';
      // Cria um elemento <h2> para o título
      const title = document.createElement('h2');
      
      // Define o conteúdo: #ID nome (ex: "#25 pikachu")
      title.textContent = `#${pokemon.id} ${pokemon.name}`;
      
      // Aplica CSS inline para capitalizar o nome
      title.style.textTransform = 'capitalize';
      // Cria um elemento <img> para exibir a imagem grande
      const img = document.createElement('img');

      img.src = pokemon.image;
      
      img.alt = pokemon.name;
      
     
      img.style.width = '160px';           
      img.style.display = 'block';         
      img.style.margin = '8px auto';       
      // Cria um container <div> para os tipos
      const types = document.createElement('div');
      
      // Define a classe CSS
      types.className = 'types';
      
      // Itera sobre cada tipo do pokémon
      (pokemon.types || []).forEach(t=>{
        // Cria um elemento <span> para cada tipo
        const s = document.createElement('span');
        
        s.className = 'type';
        
        s.textContent = t;
        
        types.appendChild(s);
      });



      const statsWrap = document.createElement('div');

      if(pokemon.raw && pokemon.raw.stats){
        // Itera sobre cada stat (hp, attack, defense, etc.)
        pokemon.raw.stats.forEach(s=>{
  
          const r = document.createElement('div');
          
          // Define a classe CSS
          r.className = 'stat-row';

          r.innerHTML = `<span>${s.stat.name}</span><strong>${s.base_stat}</strong>`;
          

          statsWrap.appendChild(r);
        });
      } else {

        const no = document.createElement('div');
        
        no.className = 'muted';
        

        no.textContent = 'Sem stats.';
        
        statsWrap.appendChild(no);
      }
      // Cria um botão <button> para fechar o painel
      const close = document.createElement('button');

      close.className = 'btn';
      

      close.textContent = 'Fechar';

      close.addEventListener('click', ()=> this.hide());
      // Adiciona todos os elementos ao painel na ordem desejada
      this.el.append(title, img, types, statsWrap, close);
    },
    
    hide(){
      // Oculta o painel (muda display para 'none')
      this.el.style.display = 'none';
    }
  };
}
