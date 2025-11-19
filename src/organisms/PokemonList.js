import PokemonCard from '../molecules/PokemonCard.js';


export default function PokemonList(){
  // Cria um elemento <section> para conter a grade de cards
  const wrap = document.createElement('section');
  
  // Define a classe CSS para estilização (grid com 3 colunas)
  wrap.className = 'grid';
  
  // Retorna um objeto com métodos e propriedades
  return {
    // Propriedade: elemento do DOM que será adicionado à página
    el: wrap,
    
    render(list, onSelect){
      // Limpa o container removendo todos os cards anteriores
      this.el.innerHTML = '';
      
      // Itera sobre cada pokémon da lista
      list.forEach(p=> {
        const card = PokemonCard(p, onSelect);
        
        // Adiciona o card ao container
        this.el.appendChild(card);
      });
    }
  };
}
