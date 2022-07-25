import postLikes from "./fetchApiLikes";
import getLikes from "./GetLikes";

export default function displayPokemons(pokemonObject) {  

  const pokeContainer = document.querySelector('#pokemon-container');
  const pokeCard = document.createElement('div');
  const pokeImg = document.createElement('img');
  const pokeTitle = document.createElement('h3');
  const pokeLikes = document.createElement('div');
  const pokeHeart = document.createElement('span');
  const pokeCounter = document.createElement('p');
  const pokeCounterText = document.createElement('p');
  const pokeCommentBtn = document.createElement('button');

  pokeContainer.appendChild(pokeCard);
  pokeCard.className = 'pokemon';

  pokeCard.appendChild(pokeImg);
  pokeImg.className = 'pokemon-img';
  pokeImg.src = pokemonObject.sprites.other.dream_world.front_default;
;

  pokeCard.appendChild(pokeTitle);
  pokeTitle.className = 'pokemon-name';
  pokeTitle.textContent = pokemonObject.forms[0].name;

  pokeCard.appendChild(pokeLikes);
  pokeLikes.className = 'pokemon-likes';
  pokeLikes.appendChild(pokeHeart);
  pokeHeart.textContent = '❤️';
  pokeHeart.dataset.pokeId = pokemonObject.forms[0].name;

  pokeLikes.appendChild(pokeCounter);
  pokeCounter.textContent = '5';
  pokeCounter.className = 'likes-counter';
  pokeLikes.appendChild(pokeCounterText);
  pokeCounterText.textContent = 'likes';
  pokeCommentBtn.textContent = 'comment';

  pokeCard.appendChild(pokeCommentBtn);
  pokeCommentBtn.className = 'comment-button';

  pokeHeart.addEventListener('click', () => {
    postLikes(pokeHeart.dataset.pokeId)
    getLikes(pokemonObject.forms[0].name)
  })
}
