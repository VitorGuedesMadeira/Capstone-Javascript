import './style.css';
import displayPokemons from './displayPokemons';
import fetchApi from './fetchApiPokemon';
import spa from './singlePageApp';

spa();
document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  const pokemonsCounter = document.querySelector('#pokemons-counter');
  pokemonsCounter.textContent = pokemonsArray.length;

  pokemonsArray.forEach(async (pokemon) => {
    const url = await fetch(pokemon.url);
    const pokemonUrl = await url.json();
    displayPokemons(pokemonUrl);
  });
});

document.addEventListener('click', (event) => {
  const modalContainer = document.querySelector('.modal-container');
  const modalClose = document.querySelector('.modal-close');
  if (event.target === modalContainer || event.target === modalClose) {
    modalContainer.classList.remove('show-modal');
  }
});