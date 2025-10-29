export const State = {
  pokemons: [],
  selected: null,
  limit: 20,
  offset: 0,
  total: 0,
  cache: new Map()
};

export function setList(list){ State.pokemons = list; }
export function setSelected(p){ State.selected = p; }
export function setPagination({limit=null, offset=null, total=null} = {}){
  if(limit != null) State.limit = limit;
  if(offset != null) State.offset = offset;
  if(total != null) State.total = total;
}
