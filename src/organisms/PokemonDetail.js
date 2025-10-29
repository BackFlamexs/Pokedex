export default function PokemonDetail(){
  const panel = document.createElement('aside'); panel.className = 'detail'; panel.style.display='none';
  return {
    el: panel,
    show(pokemon){
      this.el.style.display = 'block';
      this.el.innerHTML = '';
      const title = document.createElement('h2'); title.textContent = `#${pokemon.id} ${pokemon.name}`; title.style.textTransform='capitalize';
      const img = document.createElement('img'); img.src = pokemon.image; img.alt = pokemon.name; img.style.width='160px'; img.style.display='block'; img.style.margin='8px auto';
      const types = document.createElement('div'); types.className='types'; (pokemon.types||[]).forEach(t=>{ const s=document.createElement('span'); s.className='type'; s.textContent=t; types.appendChild(s); });
      const statsWrap = document.createElement('div');
      if(pokemon.raw && pokemon.raw.stats){
        pokemon.raw.stats.forEach(s=>{
          const r = document.createElement('div'); r.className='stat-row'; r.innerHTML = `<span>${s.stat.name}</span><strong>${s.base_stat}</strong>`; statsWrap.appendChild(r);
        });
      } else {
        const no = document.createElement('div'); no.className='muted'; no.textContent='Sem stats.'; statsWrap.appendChild(no);
      }
      const close = document.createElement('button'); close.className='btn'; close.textContent='Fechar'; close.addEventListener('click', ()=> this.hide());
      this.el.append(title, img, types, statsWrap, close);
    },
    hide(){ this.el.style.display='none'; }
  };
}
