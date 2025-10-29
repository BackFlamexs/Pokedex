// ============================================================================
// COMPONENTE ATÔMICO - PokemonImage.js
// ============================================================================
// Uma imagem é um componente básico (átomo) da interface
// Recebe a URL e o texto alternativo, retorna um elemento <img> pronto
// ============================================================================

// ============================================================================
// FUNÇÃO: PokemonImage
// Cria e retorna um elemento <img> para exibir a imagem do pokémon
// Parâmetros:
//   - src: URL da imagem (ex: "https://raw.githubusercontent.com/.../pikachu.png")
//   - alt: texto alternativo para acessibilidade (padrão string vazia)
// Retorna: elemento <img> do DOM
// ============================================================================
export default function PokemonImage(src, alt = '') {
  // Cria um novo elemento <img>
  const img = document.createElement('img');
  
  // Define a classe CSS para estilização
  img.className = 'pokemon-image';
  
  // Define a URL da imagem a ser exibida
  img.src = src;
  
  // Define o texto alternativo (importante para acessibilidade)
  // Se a imagem não carregar, este texto é exibido
  img.alt = alt;
  
  // Retorna a imagem pronta para ser adicionada ao DOM
  return img;
}
