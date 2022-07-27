import fetchApiMock from '../__mocks__/pokemonsFetchMock';

test('Array [1,2,3] should return 3', () => {
  fetchApiMock().then((answer) => {
    const pokemonsArray = answer.results;
    const pokemonsCounter = pokemonsArray.length;
    expect(pokemonsCounter).toBe(3);
  });
});
