import getComments from './getComments.js';
import postComments from './postComments.js';

export default function displayModal(pokemonObject) {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  modalContainer.appendChild(modal);
  const modalClose = document.createElement('span');
  modal.appendChild(modalClose);
  modalClose.textContent = '✖️';
  modalClose.className = 'modal-close';
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
    pokeType.className = element.type.name;
    typesContainer.appendChild(pokeType);
  });

  const commentsTitle = document.createElement('h4');
  const commentsContainer = document.createElement('ul');
  modal.appendChild(commentsTitle);
  commentsTitle.textContent = 'Comments';
  modal.appendChild(commentsContainer);
  commentsContainer.className = 'comments-container';

  const displayComments = () => {
    commentsContainer.innerHTML = '';
    getComments(pokemonObject.forms[0].name).then((modalComments) => {
      if (modalComments.length !== 0) {
        commentsTitle.textContent = `Comments (${modalComments.length})`;
      } else {
        commentsTitle.textContent = 'Comments(0)';
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
  modal.appendChild(commentsForm);
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