const pokedex = document.querySelector('#pokedex-container');
const buttons = document.querySelector('.buttons');
const cleanPokedex = () => {
  while (pokedex.lastChild !== buttons) {
    pokedex.removeChild(pokedex.lastChild);
  }
};

export default cleanPokedex;