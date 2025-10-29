import Input from '../atoms/Input.js';
import Button from '../atoms/Button.js';

export default function SearchBar({onSearch}){
  const wrap = document.createElement('div');
  wrap.className = 'search';
  const input = Input({placeholder:'Buscar por nome ou id...'});
  const btn = Button({text:'Buscar', onClick: ()=> onSearch(input.value)});
  input.addEventListener('keydown', e=>{ if(e.key === 'Enter') onSearch(input.value); });
  wrap.append(input, btn);
  return { el: wrap, input };
}
