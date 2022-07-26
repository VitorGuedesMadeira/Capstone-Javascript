export default function displayModal(pokemonObject) {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  modalContainer.appendChild(modal);
  // -----------------------//
  const pokeImgModal = document.createElement('img');
  pokeImgModal.src = pokemonObject.sprites.other.home.front_default;
  pokeImgModal.classList = 'poke-img-modal';
  modal.appendChild(pokeImgModal);
  // -----------------------//
  const pokeTitle = document.createElement('h3');
  modal.appendChild(pokeTitle);
  pokeTitle.textContent = pokemonObject.forms[0].name;
  // -----------------------//
  const typesContainer = document.createElement('div');
  typesContainer.className = 'modal-types';
  modal.appendChild(typesContainer);

  pokemonObject.types.forEach((element) => {
    const pokeType = document.createElement('p');
    pokeType.textContent = element.type.name;
    typesContainer.appendChild(pokeType);
  });

  const commentsForm = document.createElement('form');
  const nameInput = document.createElement('input');
  const commentInput = document.createElement('textarea');
  const submitBtn = document.createElement('button');
  modal.appendChild(commentsForm);
  commentsForm.className = 'comments-form';
  commentsForm.action = 'submit';
  commentsForm.appendChild(nameInput);
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';
  commentsForm.appendChild(commentInput);
  commentInput.placeholder = 'Your Comment';
  commentsForm.appendChild(submitBtn);
  submitBtn.textContent = 'Submit';
}
