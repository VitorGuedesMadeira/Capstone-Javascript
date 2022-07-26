export default function displayModal(pokemonObject) {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  modalContainer.appendChild(modal)
  //-----------------------//
  const pokeImgModal = document.createElement('img');
  pokeImgModal.src = pokemonObject.sprites.other.home.front_default;
  pokeImgModal.classList = 'poke-img-modal'
  modal.appendChild(pokeImgModal);
  //-----------------------//
  const pokeTitle = document.createElement('h3');
  modal.appendChild(pokeTitle);
  pokeTitle.textContent = pokemonObject.forms[0].name;
  //-----------------------//
  pokemonObject.types.forEach(element => {
    const pokeType = document.createElement('p')
    pokeType.textContent = element.type.name
    modal.appendChild(pokeType)
});
}
