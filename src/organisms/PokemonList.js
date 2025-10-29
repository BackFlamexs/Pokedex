// ============================================================================
// COMPONENTE ORGANISMO - PokemonList.js
// ============================================================================
// Uma lista de pokémons é um organismo: agrupa múltiplas moléculas (cards)
// Responsável por renderizar a grade de cards
// ============================================================================

// Importa o componente molecular de card
import PokemonCard from '../molecules/PokemonCard.js';

// ============================================================================
// FUNÇÃO: PokemonList
// Cria e retorna um organismo que gerencia a lista de pokémons
// Retorna: objeto com { el, render } onde:
//   - el: elemento <section> que contém a grade
//   - render: função para atualizar a lista com novos pokémons
// ============================================================================
export default function PokemonList(){
  // Cria um elemento <section> para conter a grade de cards
  const wrap = document.createElement('section');
  
  // Define a classe CSS para estilização (grid com 3 colunas)
  wrap.className = 'grid';
  
  // Retorna um objeto com métodos e propriedades
  return {
    // Propriedade: elemento do DOM que será adicionado à página
    el: wrap,
    
    // ====================================================================
    // MÉTODO: render
    // Renderiza a lista de pokémons como cards
    // Parâmetros:
    //   - list: array de pokémons a exibir
    //   - onSelect: função a executar quando um card for clicado
    // ====================================================================
    render(list, onSelect){
      // Limpa o container removendo todos os cards anteriores
      // Isso garante que não haja duplicatas ao re-renderizar
      this.el.innerHTML = '';
      
      // Itera sobre cada pokémon da lista
      list.forEach(p=> {
        // Cria um card para o pokémon usando o componente molecular
        // Passa o pokémon e a função onSelect como parâmetros
        const card = PokemonCard(p, onSelect);
        
        // Adiciona o card ao container
        this.el.appendChild(card);
      });
    }
  };
}
