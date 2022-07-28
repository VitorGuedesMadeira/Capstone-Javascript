const modal = document.querySelector('.modal');

const cleanModal = () => {
  while (modal.firstChild) {
    modal.removeChild(modal.lastChild);
  }
};

export default cleanModal;