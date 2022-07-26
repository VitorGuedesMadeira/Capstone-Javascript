const fetchApi = async () => {
  const getPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=27&offset=0');
  return getPokemons.json();
};

export default fetchApi;