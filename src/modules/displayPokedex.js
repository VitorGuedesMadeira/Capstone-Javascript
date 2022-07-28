import pokedexImage from '../images/pokedex.png'
import lightpokedex from '../images/lightpokedex.png'

export default async function displayPokedex(pokemonArr, pokemonNumber) {
    const url = await fetch(pokemonArr[`${pokemonNumber}`].url);
    const pokemonUrl = await url.json();

    const pokedexSection = document.querySelector('#pokedex-container');
    // pokedex image
    const pokedex = document.createElement('img');
    pokedex.src = pokedexImage;
    pokedex.setAttribute('class', 'pokedex');
    pokedexSection.appendChild(pokedex);
    // poke gif
    const insidePokedexPokemon = document.createElement('img');
    insidePokedexPokemon.src = await pokemonUrl.sprites.versions["generation-v"]["black-white"].animated.front_default
    insidePokedexPokemon.className = 'pokedex-pokemon-inside';
    pokedexSection.appendChild(insidePokedexPokemon)
    // poke outside
    const outsidePokemon = document.createElement('img');
    outsidePokemon.src = await pokemonUrl.sprites.other.home.front_default
    outsidePokemon.className = 'pokedex-pokemon-outside';
    pokedexSection.appendChild(outsidePokemon)
    // pokedex light
    const pokelight = document.createElement('img');
    pokelight.src = lightpokedex;
    pokelight.className = 'pokedex-light'
    pokedexSection.appendChild(pokelight)
    // pokedex pokemon name
    const pokedexPokeName = document.createElement('p');
    pokedexPokeName.textContent = pokemonUrl.forms[0].name.toUpperCase();
    pokedexPokeName.className = 'pokedex-pokemon-name'
    pokedexSection.appendChild(pokedexPokeName);
    // pokedex pokemon type
    const pokeTypes = document.createElement('div');
    pokeTypes.className = `pokedex-pokemon-type`;
    pokemonUrl.types.forEach((element) => {
        const pokeType = document.createElement('p');
        pokeType.textContent = element.type.name.toUpperCase();
        pokeTypes.appendChild(pokeType);
      });
    pokedexSection.appendChild(pokeTypes);

    //microverse title
    const microverseTitle = document.createElement('h2');
    microverseTitle.className = 'microverse-title';
    pokedexSection.appendChild(microverseTitle);
}
