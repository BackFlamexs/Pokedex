
import Input from '../atoms/Input.js';
import Button from '../atoms/Button.js';


export default function SearchBar({onSearch, onFilterType, types = []}){
  // Cria um container <div> para agrupar os elementos da barra de busca
  const wrap = document.createElement('div');
  
  // Define a classe CSS para estilização
  wrap.className = 'search';

  // Cria um input de texto usando o componente atômico Input
  const input = Input({placeholder:'Buscar por nome ou ID...'});
  
  // Cria um botão "Buscar" usando o componente atômico Button
  const btn = Button({text:'Buscar', onClick: ()=> onSearch(input.value)});
  
  // Adiciona um listener para a tecla Enter no input
  input.addEventListener('keydown', e=>{ 
    if(e.key === 'Enter') onSearch(input.value); 
  });


  // Cria um elemento <select> (caixa de seleção)
  const select = document.createElement('select');
  

  select.className = 'input';
  
  // Cria a opção padrão "Todos os tipos"
  const optAll = document.createElement('option');
  optAll.value = '';                    
  optAll.textContent = 'Todos os tipos'; 
  select.appendChild(optAll);  
  // Itera sobre cada tipo recebido e cria uma opção para cada um
  types.forEach(t=>{

    const o = document.createElement('option');
    
    o.value = t;

    o.textContent = t;

    select.appendChild(o);
  });
  
  // Adiciona um listener para quando o usuário muda a seleção
  select.addEventListener('change', ()=> onFilterType(select.value));


  wrap.append(input, btn, select);
  

  return { el: wrap, input, select };
}
