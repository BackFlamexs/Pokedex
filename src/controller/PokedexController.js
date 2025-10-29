import * as API from '../service/PokeAPIService.js';
import * as Model from '../model/PokemonModel.js';
import SearchBar from '../molecules/SearchBar.js';
import PokemonList from '../organisms/PokemonList.js';
import PokemonDetail from '../organisms/PokemonDetail.js';
import Button from '../atoms/Button.js';

const rootHeader = document.getElementById('app-header');
const rootMain = document.getElementById('app-main');

const PokedexController = {
  async init(){
    // montar header
    const header = document.createElement('header'); header.className='header';
    const title = document.createElement('div'); title.className='title';
    const h = document.createElement('h1'); h.textContent = 'Pokédex';
    const p = document.createElement('p'); p.textContent = 'Atomic Design + MVC (adaptado)';
    title.append(h,p);
    const search = SearchBar({onSearch: this.handleSearch.bind(this)});
    header.append(title, search.el);
    rootHeader.appendChild(header);

    // montar list e detail
    this.list = PokemonList(); rootMain.appendChild(this.list.el);
    this.detail = PokemonDetail(); rootMain.appendChild(this.detail.el);

    // paginacao controls
    const pagWrap = document.createElement('div'); pagWrap.className='pagination';
    const prev = Button({text:'Anterior', onClick: async ()=>{ Model.State.offset = Math.max(0, Model.State.offset - Model.State.limit); await this.loadPage(); }});
    const next = Button({text:'Próximo', onClick: async ()=>{ Model.State.offset = Model.State.offset + Model.State.limit; await this.loadPage(); }});
    prev.disabled = true;
    pagWrap.append(prev, next);
    rootMain.appendChild(pagWrap);
    this.prevBtn = prev; this.nextBtn = next;

    // inicial
    await this.loadPage();
  },

  async loadPage(){
    try{
      const listResp = await API.fetchPokemonList(Model.State.limit, Model.State.offset);
      Model.setPagination({total: listResp.count});

      const items = await Promise.all(listResp.results.map(async r=>{
        const idMatch = r.url.match(/\/(\d+)\/?$/);
        const id = idMatch ? Number(idMatch[1]) : null;
        if(Model.State.cache.has(r.name)) return Model.State.cache.get(r.name);
        try{
          const d = await API.fetchPokemonByNameOrId(r.name);
          const obj = { id: d.id, name: d.name, image: (d.sprites && d.sprites.other && d.sprites.other['official-artwork'] && d.sprites.other['official-artwork'].front_default) || d.sprites.front_default || 'assets/placeholder.png', types: d.types.map(t=>t.type.name), raw: d };
          Model.State.cache.set(r.name, obj);
          return obj;
        }catch(err){
          return { id, name: r.name, image: 'assets/placeholder.png', types: [], raw: null };
        }
      }));

      Model.setList(items);
      this.renderList();
    }catch(err){
      rootMain.innerHTML = `<div class="muted">Erro: ${err.message}</div>`;
    }
  },

  renderList(){
    this.list.render(Model.State.pokemons, this.handleSelect.bind(this));
    this.prevBtn.disabled = Model.State.offset === 0;
  },

  async handleSearch(term){
    if(!term) return this.loadPage();
    try{
      const data = await API.fetchPokemonByNameOrId(term);
      const obj = { id: data.id, name: data.name, image: (data.sprites && data.sprites.other && data.sprites.other['official-artwork'] && data.sprites.other['official-artwork'].front_default) || data.sprites.front_default || 'assets/placeholder.png', types: data.types.map(t=>t.type.name), raw: data };
      Model.setSelected(obj);
      this.detail.show(obj);
    }catch(err){
      alert('Não encontrado: ' + err.message);
    }
  },

  handleSelect(pokemon){
    Model.setSelected(pokemon);
    this.detail.show(pokemon);
  }
};

export default PokedexController;
