const bodyElement = document.querySelector('body');
const errorMessageTemplate = document.querySelector('#error').content;

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKedown);
  document.removeEventListener('click', onErrorMessageClick);
};

function onErrorMessageEscKedown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorMessage();
  }
}

function onErrorMessageClick () {
  closeErrorMessage();
}

const showErrorMessage = () => {
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  const closeButton = errorMessageElement.querySelector('.error__button');

  errorMessageFragment.appendChild(errorMessageElement);
  bodyElement.appendChild(errorMessageFragment);
  closeButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKedown);
  document.addEventListener('click', onErrorMessageClick);
};

export { showErrorMessage };
