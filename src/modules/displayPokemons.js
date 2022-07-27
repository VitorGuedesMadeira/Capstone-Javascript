import cleanModal from './cleanModal';
import displayModal from './displayModal';
import fetchLikes from './fetchApiLikes';
import postLikes from './postApiLikes';

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
  pokeImg.src = pokemonObject.sprites.other['official-artwork'].front_default;

  pokeCard.appendChild(pokeTitle);
  pokeTitle.className = 'pokemon-name';
  pokeTitle.textContent = pokemonObject.forms[0].name;

  pokeCard.appendChild(pokeLikes);
  pokeLikes.className = 'pokemon-likes';
  pokeLikes.appendChild(pokeHeart);
  pokeHeart.textContent = '❤️';
  pokeHeart.classList = 'heart-likes';
  pokeHeart.dataset.pokeId = pokemonObject.forms[0].name;

  pokeLikes.appendChild(pokeCounter);
  pokeCounter.className = 'likes-counter';
  pokeLikes.appendChild(pokeCounterText);
  pokeCounter.textContent = '0';
  pokeCounterText.textContent = 'likes';
  pokeCommentBtn.textContent = 'comment';

  pokeCard.appendChild(pokeCommentBtn);
  pokeCommentBtn.className = 'comment-button';

  setTimeout(() => fetchLikes(pokemonObject.forms[0], pokeCounter), 1000);

  pokeHeart.addEventListener('click', () => {
    pokeHeart.classList.remove('heart-likes');
    postLikes(pokeHeart.dataset.pokeId);
    setTimeout(() => fetchLikes(pokemonObject.forms[0], pokeCounter), 700);
  });

  pokeCard.addEventListener('click', async (e) => {
    if (e.target !== pokeHeart) {
      const modalContainer = document.querySelector('.modal-container');
      modalContainer.classList.add('show-modal');
      await cleanModal();
      displayModal(pokemonObject);
    }
  });
}
