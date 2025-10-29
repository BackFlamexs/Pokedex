import PokemonCard from '../molecules/PokemonCard.js';

export default function PokemonList(){
  const wrap = document.createElement('section');
  wrap.className = 'grid';
  return {
    el: wrap,
    render(list, onSelect){
      this.el.innerHTML = '';
      list.forEach(p=> this.el.appendChild(PokemonCard(p, onSelect)));
    }
  };
}
