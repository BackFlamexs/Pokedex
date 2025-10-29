import PokemonImage from '../atoms/PokemonImage.js';

export default function PokemonCard(pokemon, onSelect){
  const card = document.createElement('article');
  card.className = 'card';
  const img = PokemonImage(pokemon.image || 'assets/placeholder.png', pokemon.name);
  img.style.width = '96px';
  img.style.height = '96px';
  const title = document.createElement('div'); title.textContent = `#${pokemon.id} ${pokemon.name}`;
  title.style.marginTop = '8px'; title.style.textTransform='capitalize';
  const typesWrap = document.createElement('div'); typesWrap.className = 'types';
  (pokemon.types || []).forEach(t=>{ const s = document.createElement('span'); s.className='type'; s.textContent = t; typesWrap.appendChild(s); });
  card.append(img, title, typesWrap);
  card.addEventListener('click', ()=> onSelect(pokemon));
  return card;
}
