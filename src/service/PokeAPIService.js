const API = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit=20, offset=0){
  const res = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`);
  if(!res.ok) throw new Error('Erro ao buscar lista: ' + res.status);
  return await res.json();
}

export async function fetchPokemonByNameOrId(term){
  if(!term) throw new Error('Termo vazio');
  const res = await fetch(`${API}/pokemon/${term.toString().toLowerCase()}`);
  if(!res.ok) throw new Error('Não encontrado: ' + res.status);
  return await res.json();
}
