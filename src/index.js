import './style.css';
import displayPokemons from './displayPokemons.js';
import fetchApi from './fetchApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetchApi();
  res.forEach((poke) => displayPokemons(poke));
});
