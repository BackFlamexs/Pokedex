// ============================================================================
// CAMADA DE MODELO - PokemonModel.js
// ============================================================================
// Responsável por manter o estado global da aplicação
// Aqui guardamos dados que precisam ser compartilhados entre componentes
// ============================================================================

// ============================================================================
// OBJETO: State
// Estado global da aplicação
// Propriedades:
//   - pokemons: array de pokémons a exibir na lista
//   - selected: pokémon atualmente selecionado (para mostrar no detalhe)
//   - limit: quantos pokémons por página (padrão 20)
//   - offset: posição inicial da paginação (padrão 0)
//   - total: total de pokémons na API (para saber se há próxima página)
//   - cache: Map para armazenar pokémons já buscados (otimização)
// ============================================================================
export const State = {
  pokemons: [],        // Lista de pokémons a renderizar
  selected: null,      // Pokémon selecionado para detalhe
  limit: 20,           // Pokémons por página
  offset: 0,           // Posição atual na paginação
  total: 0,            // Total de pokémons na API
  cache: new Map()     // Cache de pokémons já buscados
};

// ============================================================================
// FUNÇÃO: setList
// Atualiza a lista de pokémons no estado
// Parâmetro:
//   - list: array de pokémons a exibir
// ============================================================================
export function setList(list) {
  // Substitui a lista anterior pela nova
  State.pokemons = list;
}

// ============================================================================
// FUNÇÃO: setSelected
// Atualiza o pokémon selecionado no estado
// Parâmetro:
//   - p: objeto do pokémon selecionado
// ============================================================================
export function setSelected(p) {
  // Salva o pokémon selecionado para exibir no painel de detalhes
  State.selected = p;
}

// ============================================================================
// FUNÇÃO: setPagination
// Atualiza os dados de paginação no estado
// Parâmetro:
//   - limit: (opcional) quantos pokémons por página
//   - offset: (opcional) posição inicial
//   - total: (opcional) total de pokémons
// ============================================================================
export function setPagination({limit=null, offset=null, total=null} = {}) {
  // Atualiza limit se foi fornecido (não null)
  if(limit != null) State.limit = limit;
  
  // Atualiza offset se foi fornecido (não null)
  if(offset != null) State.offset = offset;
  
  // Atualiza total se foi fornecido (não null)
  if(total != null) State.total = total;
}
