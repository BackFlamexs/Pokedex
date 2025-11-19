
import PokemonImage from '../atoms/PokemonImage.js';


export default function PokemonCard(pokemon, onSelect){
  // Cria um elemento <article> para representar o card
  const card = document.createElement('article');
  
  // Define a classe CSS para estilização
  card.className = 'card';

  const img = PokemonImage(pokemon.image || 'assets/placeholder.png', pokemon.name);
  
  // Cria um container <div> para agrupar nome/ID e tipos
  const info = document.createElement('div');
  
  // Define a classe CSS para estilização
  info.className = 'info';

  // Cria um elemento <div> para o título
  const title = document.createElement('div');
  
  // Define a classe CSS
  title.className = 'title';
  
  // Define o conteúdo: #ID nome (ex: "#25 pikachu")
  title.textContent = `#${pokemon.id} ${pokemon.name}`;
  

  title.style.textTransform = 'capitalize';

  const typesWrap = document.createElement('div');

  typesWrap.className = 'types';
  
  // Itera sobre cada tipo do pokémon (ex: ["electric", "normal"])
  (pokemon.types || []).forEach(t=>{
    const s = document.createElement('span');
    

    s.className = 'type';
    
    s.textContent = t;
    
    typesWrap.appendChild(s);
  });


  info.append(title, typesWrap);
  
  // Adiciona imagem e informações ao card
  card.append(img, info);


  card.addEventListener('click', ()=> onSelect(pokemon));
  

  return card;
}
