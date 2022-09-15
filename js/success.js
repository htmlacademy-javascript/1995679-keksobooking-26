const bodyElement = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content;

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKedown);
  document.removeEventListener('click', onSuccessMessageClick);
};

function onSuccessMessageEscKedown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

function onSuccessMessageClick () {
  closeSuccessMessage();
}

const showSuccessMessage = () => {
  const successMessageFragment = document.createDocumentFragment();
  const successMessageElement = successMessageTemplate.cloneNode(true);

  successMessageFragment.appendChild(successMessageElement);
  bodyElement.appendChild(successMessageFragment);
  document.addEventListener('keydown', onSuccessMessageEscKedown);
  document.addEventListener('click', onSuccessMessageClick);
};

export { showSuccessMessage };
