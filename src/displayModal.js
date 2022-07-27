import getComments from './getComments.js';
import postComments from './postComments.js';

export default function displayModal(pokemonObject) {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  modalContainer.appendChild(modal);
  const modalClose = document.createElement('span');
  // -----------------------//
  const modalDiv1 = document.createElement('div');
  modal.appendChild(modalDiv1);
  const individualCard = document.createElement('img');
  individualCard.src = pokemonObject.sprites.other.dream_world.front_default;
  individualCard.className = 'card-pokemon-inside';
  modalDiv1.appendChild(individualCard);
  modalDiv1.className = 'individual-modal-card';
  // ----- POKEMON NAME ----//
  const pokeName = document.createElement('h4');
  pokeName.textContent = pokemonObject.forms[0].name;
  modalDiv1.appendChild(pokeName);
  // ------TYPES -----------//
  const cardTypesContainer = document.createElement('div');
  const cardTypesTitle = document.createElement('h5');
  modalDiv1.appendChild(cardTypesContainer);
  cardTypesContainer.className = 'card-types';
  cardTypesContainer.appendChild(cardTypesTitle);

  pokemonObject.types.forEach((element) => {
    const pokeType = document.createElement('p');
    pokeType.textContent = element.type.name;
    cardTypesContainer.appendChild(pokeType);
    pokeType.className = 'card-types';
  });
  // ----- ABILITIES -------//
  const { abilities } = pokemonObject;
  abilities.forEach((ability) => {
    const pokemonAbility = document.createElement('p');
    pokemonAbility.textContent = `ability: ${ability.ability.name}`;
    modalDiv1.appendChild(pokemonAbility);
  });
  // ----- MOVES -----------//
  const { moves } = pokemonObject;
  for (let i = 0; i < 3; i += 1) {
    const pokemonMove = document.createElement('p');
    pokemonMove.textContent = `move: ${moves[i].move.name}`;
    modalDiv1.appendChild(pokemonMove);
  }
  // -----------------------//
  const modalDiv2 = document.createElement('div');
  modalDiv2.className = 'individual-modal-stats';
  modal.appendChild(modalDiv2);
  // -----------------------//
  modalDiv2.appendChild(modalClose);
  modalClose.textContent = '✖️';
  modalClose.className = 'modal-close';
  // ------------------------//
  const pokeImgModal = document.createElement('img');
  pokeImgModal.src = pokemonObject.sprites.other.home.front_default;
  pokeImgModal.classList = 'poke-img-modal';
  modalDiv2.appendChild(pokeImgModal);
  // -----------------------//
  const pokeTitle = document.createElement('h3');
  modalDiv2.appendChild(pokeTitle);
  pokeTitle.textContent = pokemonObject.forms[0].name;
  // -----------------------//
  const typesContainer = document.createElement('div');
  typesContainer.className = 'modal-types';
  modalDiv2.appendChild(typesContainer);
  modalDiv1.classList.add(`${pokemonObject.types[0].type.name}-card`);

  pokemonObject.types.forEach((element) => {
    const pokeType = document.createElement('p');
    pokeType.textContent = element.type.name;
    pokeType.className = element.type.name;
    typesContainer.appendChild(pokeType);
  });

  const commentsTitle = document.createElement('h4');
  const commentsContainer = document.createElement('ul');
  modalDiv2.appendChild(commentsTitle);
  commentsTitle.textContent = 'Comments';
  modalDiv2.appendChild(commentsContainer);
  commentsContainer.className = 'comments-container';

  const displayComments = () => {
    commentsContainer.innerHTML = '';
    getComments(pokemonObject.forms[0].name).then((modalComments) => {
      if (modalComments.length < 1 || modalComments.length === undefined) {
        commentsTitle.textContent = 'Comments(0)';
      } else {
        commentsTitle.textContent = `Comments (${modalComments.length})`;
      }
      modalComments.forEach((modComment) => {
        const comment = document.createElement('li');
        commentsContainer.appendChild(comment);
        const commentDate = document.createElement('p');
        const commentUser = document.createElement('p');
        const commentContent = document.createElement('p');
        comment.appendChild(commentDate);
        commentDate.textContent = modComment.creation_date;
        commentDate.className = 'date-comm';
        comment.appendChild(commentUser);
        commentUser.className = 'user-name';
        commentUser.textContent = `${modComment.username}:`;
        comment.appendChild(commentContent);
        commentContent.className = 'content-comm';
        commentContent.textContent = modComment.comment;
      });
    });
  };
  displayComments();

  const commentsForm = document.createElement('form');
  const nameInput = document.createElement('input');
  const commentInput = document.createElement('input');
  const submitBtn = document.createElement('button');
  modalDiv2.appendChild(commentsForm);
  commentsForm.className = 'comments-form';
  commentsForm.action = 'submit';
  commentsForm.appendChild(nameInput);
  nameInput.type = 'text';
  nameInput.minLength = 1;
  nameInput.maxLength = 10;
  nameInput.required = true;
  nameInput.placeholder = 'Your Name';
  commentsForm.appendChild(commentInput);
  commentInput.placeholder = 'Your Comment';
  commentInput.type = 'text';
  commentInput.minLength = 1;
  commentInput.maxLength = 27;
  commentInput.required = true;
  commentsForm.appendChild(submitBtn);
  submitBtn.textContent = 'Submit';
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameInput.value === '' || commentInput.value === '') {
      nameInput.placeholder = 'Please fill your name';
      commentInput.placeholder = 'Please fill your comment';
    } else {
      postComments(nameInput.value, commentInput.value, pokemonObject.forms[0].name)
        .then(() => (getComments(pokemonObject.forms[0].name)).then(() => displayComments()));
      nameInput.value = '';
      commentInput.value = '';
    }
  });
}