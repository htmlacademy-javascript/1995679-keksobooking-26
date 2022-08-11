const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');
const mapFiltersFormSelectElements = mapFiltersFormElement.querySelectorAll('select');
const roomNumberFormElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const accommodationTypeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');

const validateForm = () => {
  const pristine = new Pristine(adFormElement);

  pristine.addValidator(roomNumberFormElement, (value) => {
    if (value === '1' && capacityElement.value === '1') {
      return true;
    }
    if (value === '2' && capacityElement.value === '1' || value === '2' && capacityElement.value === '2') {
      return true;
    }
    if (value === '3' && capacityElement.value !== '0') {
      return true;
    }
    if (value === '100' && capacityElement.value === '0') {
      return true;
    }
    return false;
  }, 'error', 1, false);

  pristine.addValidator(accommodationTypeElement, (value) => {
    if (value === 'bungalow') {
      priceElement.min = '0';
    }
    if (value === 'flat') {
      priceElement.min = '1000';
    }
    if (value === 'hotel') {
      priceElement.min = '3000';
    }
    if (value === 'house') {
      priceElement.min = '5000';
    }
    if (value === 'palace') {
      priceElement.min = '10000';
    }
    priceElement.placeholder = priceElement.min;
    return true;
  }, 'error', 2, false);

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formIsValid = pristine.validate();
    if (formIsValid) {
      adFormElement.submit();
    }
  });
};

const makePageInactive = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFeaturesElement.disabled = true;
  mapFiltersFormSelectElements.forEach((element) => {
    element.disabled = true;
  });
};

const makePageActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFeaturesElement.disabled = false;
  mapFiltersFormSelectElements.forEach((element) => {
    element.disabled = false;
  });
};

export { makePageInactive, makePageActive, validateForm };
