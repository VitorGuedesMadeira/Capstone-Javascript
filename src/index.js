import './style.css';
import displayPokemons from './modules/displayPokemons';
import fetchApi from './modules/fetchApiPokemon';
import spa from './modules/singlePageApp';
import displayPokedex from './modules/displayPokedex';
import cleanPokedex from './modules/cleanPokedex';

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
  displayPokedex(pokemonsArray, 0)
});

document.addEventListener('click', (event) => {
  const modalContainer = document.querySelector('.modal-container');
  const modalClose = document.querySelector('.modal-close');
  if (event.target === modalContainer || event.target === modalClose) {
    modalContainer.classList.remove('show-modal');
  }
});

// pokemon number
let pokemonNumber = 0
// BACK and NEXT buttons
const backBtn = document.querySelector('.btn1')
const nextBtn = document.querySelector('.btn2')
backBtn.addEventListener('click', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  if(pokemonNumber !== 0) {
      pokemonNumber -= 1
      await cleanPokedex();
      displayPokedex(pokemonsArray, pokemonNumber)
      console.log(pokemonNumber)
  }
})

nextBtn.addEventListener('click', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  if(pokemonNumber < 150) {
      pokemonNumber += 1
      await cleanPokedex();
      displayPokedex(pokemonsArray, pokemonNumber)
      console.log(pokemonNumber)
  }
})

const navLinks = document.querySelector('#nav-links');
const hamburgerIcon = document.querySelector('#hamburger-icon');
const nav = document.querySelector('#navigation-bar');
hamburgerIcon.addEventListener('click', () => {
    nav.classList.toggle('hamburger');
})

navLinks.addEventListener('click', () => {
    nav.classList.remove('hamburger');
})