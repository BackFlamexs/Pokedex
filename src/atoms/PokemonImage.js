export default function PokemonImage(src, alt='pokemon'){
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  return img;
}
