# Pokédex – Atomic Design + MVC (Projeto Simples e Didático)

Este projeto implementa uma Pokédex consumindo a PokéAPI, organizado com Atomic Design (átomos, moléculas e organismos) e MVC (Model, View – via componentes atômicos –, Controller e Service). O objetivo é didático: código direto, básico e funcionando, para facilitar sua apresentação.

Sumário
- Objetivo e requisitos
- Como executar
- Estrutura de pastas
- Fluxo da aplicação (do carregamento até a interação)
- Explicação dos arquivos (linha a linha dos principais)
  - index.html (estrutura)
  - css/style.css (tema claro e layout)
  - src/service/PokeAPIService.js (requisições)
  - src/model/PokemonModel.js (estado)
  - src/atoms (componentes básicos)
  - src/molecules (componentes compostos)
  - src/organisms (blocos maiores)
  - src/controller/PokedexController.js (orquestração)
  - src/main.js (bootstrap)
- Decisões simplificadoras
- Possíveis melhorias


Objetivo e requisitos
- Listar pokémons
- Buscar por nome/ID
- Filtrar por categoria (tipo) via seletor
- Exibir detalhes (nome, imagem, tipos, stats)
- Manter a organização por Atomic Design e MVC


Como executar
1) Opção recomendada: servir via HTTP local (evita problemas de CORS em alguns navegadores)
   - Se tiver Python 3 instalado, rode dentro da pasta do projeto:
     - Windows/macOS/Linux: `python -m http.server 5500`
     - Acesse: http://localhost:5500/
2) Alternativa: abrir o arquivo index.html no navegador (pode funcionar, mas alguns navegadores restringem `fetch` via `file://`).


Estrutura de pastas
- index.html: HTML principal
- css/
  - style.css: tema claro, grid com 3 colunas, cartões maiores
- src/
  - main.js: inicia a aplicação
  - service/
    - PokeAPIService.js: funções de comunicação com a PokéAPI
  - model/
    - PokemonModel.js: estado global simples
  - controller/
    - PokedexController.js: lógica de negócio e coordenação
  - atoms/
    - Button.js: botão
    - Input.js: campo de texto
    - PokemonImage.js: imagem do pokémon
  - molecules/
    - SearchBar.js: input + botão + seletor de tipo
    - PokemonCard.js: imagem + infos do pokémon
  - organisms/
    - PokemonList.js: grade de cards
    - PokemonDetail.js: painel de detalhes
- assets/
  - placeholder.png: imagem local de fallback


Fluxo da aplicação
1) O navegador carrega index.html.
2) O script src/main.js espera `DOMContentLoaded` e chama `PokedexController.init()`.
3) O controller monta o cabeçalho com título e SearchBar (com seletor de tipos), cria a lista e o painel de detalhes, e os botões de paginação.
4) O controller chama `loadPage()` para buscar dados e popular a lista. Se houver um tipo selecionado, carrega por tipo; caso contrário, usa a paginação padrão.
5) Ao clicar em um card, o controller mostra o painel de detalhes do pokémon.
6) Ao buscar por nome/ID, o controller exibe imediatamente o detalhe do pokémon encontrado.
7) Ao trocar o tipo no seletor, a lista é recarregada filtrada pelo tipo.


Explicação dos arquivos (linha a linha dos principais)

index.html (estrutura)
- Define a estrutura básica com dois contêineres principais:
  - `#app-header`: onde o controller monta o título e a SearchBar
  - `#app-main`: onde a lista e o painel de detalhes são adicionados
- Importa `css/style.css` para o tema claro e layout.
- Importa `src/main.js` como módulo para inicializar a aplicação.

css/style.css (tema claro e layout)
- `:root { --bg, --card, --accent, --muted, --border }`:
  - Define variáveis de cor para facilitar ajustes do tema.
- `body { background: var(--bg); color: #0f172a }`:
  - Tema claro (fundo branco e texto escuro).
- `.grid { grid-template-columns: repeat(3, 1fr) }`:
  - Força 3 cards por linha (responsivo reduz em telas menores via media queries).
- `.card { display:flex; flex-direction:row }`:
  - Imagem e informações lado a lado.
- `.card img { width:128px;height:128px }`:
  - Aumenta a imagem do card.
- `.detail { background:#fff; border:1px solid var(--border) }`:
  - Painel de detalhes no tema claro.

src/service/PokeAPIService.js (requisições)
- `const API = 'https://pokeapi.co/api/v2'`:
  - Base da API.
- `fetchPokemonList(limit, offset)`:
  - GET `/pokemon?limit=&offset=` – lista paginada (só nome e URL).
  - Valida `res.ok` e retorna JSON.
- `fetchPokemonByNameOrId(term)`:
  - GET `/pokemon/{term}` – objeto completo do pokémon.
  - Converte `term` para string minúscula; valida `res.ok` e retorna JSON.
- `fetchTypes()`:
  - GET `/type` – retorna lista de tipos (categorias) disponíveis.
- `fetchPokemonByType(typeName)`:
  - GET `/type/{typeName}` – retorna pokémons daquele tipo; mapeia para lista de nomes.

src/model/PokemonModel.js (estado)
- `State = { pokemons, selected, limit, offset, total, cache }`:
  - Este projeto usa `limit/offset/total` para paginação.
  - O cache não é requerido para o funcionamento básico, mas pode existir; o controller atual não depende dele para o filtro por tipo.
- `setList(list)`, `setSelected(p)`, `setPagination(...)`:
  - Pequenos utilitários para atualizar o estado.

src/atoms/Button.js
- Cria e retorna um `<button>` com classe `btn`, texto e evento de clique.

src/atoms/Input.js
- Cria e retorna um `<input>` com classe `input`, placeholder e evento `input` (opcional).

src/atoms/PokemonImage.js
- Cria e retorna um `<img>` com classe `pokemon-image`, `src` e `alt`.

src/molecules/SearchBar.js
- Constrói um container `.search` com:
  - `input` de texto para buscar por nome/ID.
  - `button` “Buscar” que aciona `onSearch(value)`.
  - `select` para tipos, populado com a lista recebida (props `types`).
  - Ao mudar o `select`, chama `onFilterType(select.value)`.
  - Retorna `{ el, input, select }` para o controller manipular se necessário.

src/molecules/PokemonCard.js
- Recebe um objeto `pokemon` com `{ id, name, image, types }` e `onSelect`.
- Monta um `<article class="card">` com:
  - `img` (PokemonImage)
  - `.info` contendo:
    - `.title` com `#id nome`
    - `.types` com badges/textos dos tipos
- Adiciona `click` no card para chamar `onSelect(pokemon)` (o controller abre o detalhe).

src/organisms/PokemonList.js
- Cria `<section class="grid">` para a grade de cards.
- Método `render(list, onSelect)`:
  - Limpa o container e adiciona um `PokemonCard` para cada item da lista.

src/organisms/PokemonDetail.js
- Painel lateral `<aside class="detail">` (inicialmente oculto via `display:none`).
- `show(pokemon)`:
  - Exibe o painel, define título `#id nome` (capitalize via CSS inline), imagem grande e tipos.
  - Se existir `pokemon.raw.stats`, renderiza linhas `stat-row` com `nome do atributo` e `valor`.
  - Adiciona botão “Fechar” para esconder o painel (`hide()`).

src/controller/PokedexController.js (orquestração)
- `init()`:
  - Monta o header com título.
  - Busca os tipos via `API.fetchTypes()` e constrói a `SearchBar` com `onSearch` e `onFilterType`.
  - Cria `PokemonList` e `PokemonDetail` e adiciona ambos ao `#app-main`.
  - Cria botões de paginação “Anterior/Próximo”.
  - Chama `loadPage()` para carregar a primeira página.
- `loadPage()`:
  - Se existir `this.activeType`:
    - Busca todos os nomes do tipo (`API.fetchPokemonByType`), aplica fatiamento local para paginação (`slice(offset, offset+limit)`), e para cada nome busca o objeto completo (`fetchPokemonByNameOrId`).
    - Atualiza paginação com `total = names.length` e define lista no `Model`, então renderiza.
  - Caso contrário (sem filtro de tipo):
    - Busca lista paginada padrão (`fetchPokemonList`), para cada resultado busca o objeto completo para ter imagem e tipos, seta lista e renderiza.
  - Em erro, mostra `<div class="muted">Erro: ...</div>`.
- `renderList()`:
  - Desenha a lista e desabilita botão “Anterior” se `offset === 0`.
- `handleSearch(term)`:
  - Limpa o filtro de tipo ativo.
  - Se `term` vazio, chama `loadPage()`.
  - Senão, busca o pokémon e mostra seu detalhe diretamente (`this.detail.show(obj)`).
- `handleSelect(pokemon)`:
  - Mostra o painel de detalhe para o card clicado.
- `handleFilterType(type)`:
  - Salva `this.activeType = type`, zera o `offset` e recarrega a lista (`loadPage()`).

src/main.js (bootstrap)
- Aguarda `DOMContentLoaded` e chama `PokedexController.init()`.


Decisões simplificadoras
- Código direto, poucas camadas e funções pequenas.
- Comentários claros apenas onde agregam entendimento.
- Sem bibliotecas externas (apenas Fetch API nativa).
- Fallback robusto de imagem: official-artwork → sprite padrão → placeholder local.

Possíveis melhorias (não necessárias para a apresentação)
- Cache simples de respostas para acelerar navegação.
- Skeleton loading ou placeholders durante fetch.
- Melhorar paginação por tipo para não buscar tantos detalhes em sequência (ex.: carregar sob demanda).
- Internacionalização de textos.

Licença
- Uso livre para fins educativos e de apresentação.
#   P o k e d e x  
 