// ============================================================================
// COMPONENTE MOLECULAR - PokemonCard.js
// ============================================================================
// Um card de pokémon é uma molécula: combina átomos (Imagem + Texto)
// Exibe a imagem, nome, ID e tipos de um pokémon
// ============================================================================

// Importa o componente atômico de imagem
import PokemonImage from '../atoms/PokemonImage.js';

// ============================================================================
// FUNÇÃO: PokemonCard
// Cria e retorna um card com informações de um pokémon
// Parâmetros:
//   - pokemon: objeto com { id, name, image, types }
//   - onSelect: função a executar quando o card for clicado
// Retorna: elemento <article> (card) do DOM
// ============================================================================
export default function PokemonCard(pokemon, onSelect){
  // Cria um elemento <article> para representar o card
  const card = document.createElement('article');
  
  // Define a classe CSS para estilização
  card.className = 'card';

  // ========================================================================
  // IMAGEM DO POKÉMON
  // ========================================================================
  
  // Cria a imagem usando o componente atômico PokemonImage
  // Se pokemon.image for vazio, usa o placeholder local
  const img = PokemonImage(pokemon.image || 'assets/placeholder.png', pokemon.name);

  // ========================================================================
  // CONTAINER DE INFORMAÇÕES
  // ========================================================================
  
  // Cria um container <div> para agrupar nome/ID e tipos
  const info = document.createElement('div');
  
  // Define a classe CSS para estilização
  info.className = 'info';
  
  // ========================================================================
  // TÍTULO (ID E NOME)
  // ========================================================================
  
  // Cria um elemento <div> para o título
  const title = document.createElement('div');
  
  // Define a classe CSS
  title.className = 'title';
  
  // Define o conteúdo: #ID nome (ex: "#25 pikachu")
  title.textContent = `#${pokemon.id} ${pokemon.name}`;
  
  // Aplica CSS inline para capitalizar o nome
  title.style.textTransform = 'capitalize';

  // ========================================================================
  // TIPOS (CATEGORIAS)
  // ========================================================================
  
  // Cria um container <div> para os tipos
  const typesWrap = document.createElement('div');
  
  // Define a classe CSS
  typesWrap.className = 'types';
  
  // Itera sobre cada tipo do pokémon (ex: ["electric", "normal"])
  (pokemon.types || []).forEach(t=>{
    // Cria um elemento <span> para cada tipo
    const s = document.createElement('span');
    
    // Define a classe CSS
    s.className = 'type';
    
    // Define o texto do tipo
    s.textContent = t;
    
    // Adiciona o tipo ao container de tipos
    typesWrap.appendChild(s);
  });

  // ========================================================================
  // MONTAGEM FINAL
  // ========================================================================
  
  // Adiciona título e tipos ao container de informações
  info.append(title, typesWrap);
  
  // Adiciona imagem e informações ao card
  card.append(img, info);

  // Adiciona um listener de clique no card
  // Quando clicado, executa onSelect passando o objeto do pokémon
  card.addEventListener('click', ()=> onSelect(pokemon));
  
  // Retorna o card pronto para ser adicionado ao DOM
  return card;
}
