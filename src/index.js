import './style.css';
import displayPokemons from './displayPokemons.js';
import fetchApi from './fetchApiPokemon.js';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  pokemonsArray.forEach(async (pokemon) => {
    const url = await fetch(pokemon.url);
    const pokemonUrl = await url.json();
    displayPokemons(pokemonUrl);
  });
});

document.addEventListener('click', (event) => {
  const modalContainer = document.querySelector('.modal-container');
  if (event.target === modalContainer) {
    modalContainer.classList.remove('show-modal');
  }
})