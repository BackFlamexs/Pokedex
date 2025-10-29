
export default function PokemonImage(src, alt = 'Imagem nao esta no banco de dados, F S2') {
  // Cria um novo elemento <img>
  const img = document.createElement('img');
  
  img.className = 'pokemon-image';
  
  img.src = src;
  

  // Se a imagem não carregar, este texto é exibido
  img.alt = alt;
  
  // Retorna a imagem pronta para ser adicionada ao DOM
  return img;
}
