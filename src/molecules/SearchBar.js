// ============================================================================
// COMPONENTE MOLECULAR - SearchBar.js
// ============================================================================
// Uma barra de busca é uma molécula: combina átomos (Input + Button + Select)
// Recebe callbacks e retorna um container com os elementos compostos
// ============================================================================

// Importa os componentes atômicos que serão usados
import Input from '../atoms/Input.js';
import Button from '../atoms/Button.js';

// ============================================================================
// FUNÇÃO: SearchBar
// Cria e retorna uma barra de busca com campo de texto, botão e seletor de tipos
// Parâmetros (objeto desestruturado):
//   - onSearch: função a executar ao buscar por nome/ID
//   - onFilterType: função a executar ao mudar o tipo selecionado
//   - types: array de nomes de tipos (categorias) para popular o seletor
// Retorna: objeto { el, input, select } com os elementos
// ============================================================================
export default function SearchBar({onSearch, onFilterType, types = []}){
  // Cria um container <div> para agrupar os elementos da barra de busca
  const wrap = document.createElement('div');
  
  // Define a classe CSS para estilização
  wrap.className = 'search';

  // ========================================================================
  // CAMPO DE BUSCA POR NOME/ID
  // ========================================================================
  
  // Cria um input de texto usando o componente atômico Input
  const input = Input({placeholder:'Buscar por nome ou ID...'});
  
  // Cria um botão "Buscar" usando o componente atômico Button
  const btn = Button({text:'Buscar', onClick: ()=> onSearch(input.value)});
  
  // Adiciona um listener para a tecla Enter no input
  // Se o usuário pressionar Enter, executa a busca
  input.addEventListener('keydown', e=>{ 
    if(e.key === 'Enter') onSearch(input.value); 
  });

  // ========================================================================
  // SELETOR DE TIPO (CATEGORIA)
  // ========================================================================
  
  // Cria um elemento <select> (caixa de seleção)
  const select = document.createElement('select');
  
  // Define a classe CSS para estilização (usa a mesma do input)
  select.className = 'input';
  
  // Cria a opção padrão "Todos os tipos"
  const optAll = document.createElement('option');
  optAll.value = '';                    // Valor vazio significa "sem filtro"
  optAll.textContent = 'Todos os tipos'; // Texto exibido
  select.appendChild(optAll);            // Adiciona a opção ao select
  
  // Itera sobre cada tipo recebido e cria uma opção para cada um
  types.forEach(t=>{
    // Cria um novo elemento <option>
    const o = document.createElement('option');
    
    // Define o valor (nome do tipo em minúsculas)
    o.value = t;
    
    // Define o texto exibido (nome do tipo capitalizado)
    o.textContent = t;
    
    // Adiciona a opção ao select
    select.appendChild(o);
  });
  
  // Adiciona um listener para quando o usuário muda a seleção
  // Executa onFilterType com o valor selecionado
  select.addEventListener('change', ()=> onFilterType(select.value));

  // ========================================================================
  // MONTAGEM FINAL
  // ========================================================================
  
  // Adiciona todos os elementos ao container (input, botão, select)
  wrap.append(input, btn, select);
  
  // Retorna um objeto com:
  //   - el: o container com todos os elementos
  //   - input: referência ao input (para o controller acessar o valor)
  //   - select: referência ao select (para o controller manipular se necessário)
  return { el: wrap, input, select };
}
