// Define a URL base da PokéAPI (versão 2)
const API = 'https://pokeapi.co/api/v2';


export async function fetchPokemonList(limit = 20, offset = 0) {
  // Constrói a URL com parâmetros de paginação
  const res = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!res.ok) throw new Error('Erro ao buscar lista: ' + res.status);
  
  // Converte a resposta em objeto JavaScript (JSON)
  return await res.json();
}

export async function fetchPokemonByNameOrId(term) {
  // Valida se o termo foi fornecido
  if (!term) throw new Error('Termo vazio');
  

  const res = await fetch(`${API}/pokemon/${term.toString().toLowerCase()}`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Não encontrado: ' + res.status);
  
  return await res.json();
}


export async function fetchTypes() {
  // Requisita a lista de tipos
  const res = await fetch(`${API}/type`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Erro ao buscar tipos: ' + res.status);
  
  // Retorna o objeto JSON com a lista de tipos
  return await res.json();
}

export async function fetchPokemonByType(typeName) {

  const res = await fetch(`${API}/type/${typeName}`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Erro ao buscar por tipo: ' + res.status);
  
  // Converte para JSON
  const data = await res.json();

  return data.pokemon.map(p => p.pokemon.name);
}
