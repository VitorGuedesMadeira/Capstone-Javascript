function spa() {
  const navA = document.querySelectorAll('.nav-link');
  const navAList = Array.from(navA);
  const pokemons = document.querySelector('#pokemon-container');
  const pokedex = document.querySelector('#pokedex-container');
  const pokeball = document.querySelector('#pokeball-container');

  navAList.forEach((child) => {
    if (child.classList.contains('first-a')) {
      child.addEventListener('click', () => {
        pokemons.classList.remove('hide');
        pokedex.classList.add('hide');
        pokeball.classList.add('hide');
        pokemons.classList.remove('reduce-grid');
      });
    } else if (child.classList.contains('second-a')) {
      child.addEventListener('click', () => {
        pokedex.classList.remove('hide');
        pokemons.classList.remove('hide');
        pokeball.classList.add('hide');
        pokemons.style.flex = '1';
        pokedex.style.flex = '4';
        pokemons.classList.add('reduce-grid');
      });
    } else {
      child.addEventListener('click', () => {
        pokeball.classList.remove('hide');
        pokedex.classList.add('hide');
        pokemons.classList.add('hide');
      });
    }
  });
}
export default spa;
