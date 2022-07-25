export default function displayPokemons(pokemon) {
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
  pokeImg.src = pokemon.APIimg;

  pokeCard.appendChild(pokeTitle);
  pokeTitle.className = 'pokemon-name';
  pokeTitle.textContent = pokemon.APIname;

  pokeCard.appendChild(pokeLikes);
  pokeLikes.className = 'pokemon-likes';
  pokeLikes.appendChild(pokeHeart);
  pokeHeart.textContent = '❤️';
  pokeLikes.appendChild(pokeCounter);
  pokeCounter.textContent = pokemon.APIlikesCounter;
  pokeCounter.className = 'likes-counter';
  pokeLikes.appendChild(pokeCounterText);
  pokeCounterText.textContent = 'likes';

  pokeCard.appendChild(pokeCommentBtn);
  pokeCommentBtn.className = 'comment-button';
}
