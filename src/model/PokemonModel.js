
export const State = {
  pokemons: [],        
  selected: null,      
  limit: 20,           
  offset: 0,          
  total: 0,       
  cache: new Map()  
};


export function setList(list) {
  // Substitui a lista anterior pela nova
  State.pokemons = list;
}

export function setSelected(p) {
  // Salva o pokémon selecionado para exibir no painel de detalhes
  State.selected = p;
}


export function setPagination({limit=null, offset=null, total=null} = {}) {
  // Atualiza limit se foi fornecido (não null)
  if(limit != null) State.limit = limit;
  
  if(offset != null) State.offset = offset;
  
  // Atualiza total se foi fornecido (não null)
  if(total != null) State.total = total;
}
