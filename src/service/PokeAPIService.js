// ============================================================================
// CAMADA DE SERVIÇO - PokeAPIService.js
// ============================================================================
// Responsável por todas as requisições HTTP à PokéAPI
// Mantemos tudo isolado aqui para facilitar manutenção, testes e reutilização
// ============================================================================

// Define a URL base da PokéAPI (versão 2)
const API = 'https://pokeapi.co/api/v2';

// ============================================================================
// FUNÇÃO: fetchPokemonList
// Busca uma página de pokémons com paginação
// Parâmetros:
//   - limit: quantos pokémons retornar (padrão 20)
//   - offset: a partir de qual posição começar (padrão 0)
// Retorna: objeto JSON com { count, next, previous, results }
// ============================================================================
export async function fetchPokemonList(limit = 20, offset = 0) {
  // Constrói a URL com parâmetros de paginação
  // Exemplo: https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  const res = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`);
  
  // Valida se a requisição foi bem-sucedida (status 200-299)
  // Se não, lança um erro que será capturado no controller
  if (!res.ok) throw new Error('Erro ao buscar lista: ' + res.status);
  
  // Converte a resposta em objeto JavaScript (JSON)
  return await res.json();
}

// ============================================================================
// FUNÇÃO: fetchPokemonByNameOrId
// Busca um pokémon específico pelo nome ou ID
// Parâmetro:
//   - term: nome (ex: "pikachu") ou ID (ex: "25")
// Retorna: objeto JSON completo do pokémon com sprites, stats, tipos, etc.
// ============================================================================
export async function fetchPokemonByNameOrId(term) {
  // Valida se o termo foi fornecido
  if (!term) throw new Error('Termo vazio');
  
  // Converte o termo para string e depois para minúsculas
  // Exemplo: 25 vira "25", "Pikachu" vira "pikachu"
  const res = await fetch(`${API}/pokemon/${term.toString().toLowerCase()}`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Não encontrado: ' + res.status);
  
  // Retorna o objeto JSON do pokémon
  return await res.json();
}

// ============================================================================
// FUNÇÃO: fetchTypes
// Busca a lista de todos os tipos (categorias) de pokémons disponíveis
// Retorna: objeto JSON com { count, next, previous, results }
// results contém objetos { name, url } para cada tipo
// ============================================================================
export async function fetchTypes() {
  // Requisita a lista de tipos
  const res = await fetch(`${API}/type`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Erro ao buscar tipos: ' + res.status);
  
  // Retorna o objeto JSON com a lista de tipos
  return await res.json();
}

// ============================================================================
// FUNÇÃO: fetchPokemonByType
// Busca todos os pokémons de um tipo específico
// Parâmetro:
//   - typeName: nome do tipo (ex: "fire", "water", "grass")
// Retorna: array de strings com nomes dos pokémons daquele tipo
// ============================================================================
export async function fetchPokemonByType(typeName) {
  // Requisita os dados do tipo específico
  // Exemplo: https://pokeapi.co/api/v2/type/fire
  const res = await fetch(`${API}/type/${typeName}`);
  
  // Valida a resposta
  if (!res.ok) throw new Error('Erro ao buscar por tipo: ' + res.status);
  
  // Converte para JSON
  const data = await res.json();
  
  // A API retorna um array "pokemon" com objetos { pokemon: { name, url }, slot }
  // Usamos .map() para extrair apenas os nomes dos pokémons
  // Exemplo: [{ pokemon: { name: "charmander", url: "..." }, slot: 1 }, ...]
  // Vira: ["charmander", "charmeleon", "charizard", ...]
  return data.pokemon.map(p => p.pokemon.name);
}
