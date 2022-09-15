import { sendData } from './api.js';
import { resetMainMarkerPosition } from './map.js';
import { showSuccessMessage } from './success.js';
import { showErrorMessage } from './error.js';
import { resetFilters } from './filter-offers.js';

const PRISTINE_CONFIG = {
  classTo: 'ad-form__element',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error-text'
};

const MIN_ACCOMMODATION_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const INITIAL_PRICE_AMOUNT = '1000';

const ALLOWED_CAPACITIES_PER_ROOM_NUMBER = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const DEFAULT_SLIDER_STEP = 1;

const adForm = document.querySelector('.ad-form');
const adFormFieldsetElements = adForm.querySelectorAll('fieldset');
const roomNumberFormElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const accommodationTypeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const sliderElement = adForm.querySelector('.ad-form__slider');
const timeInElement = adForm.querySelector('#timein');
const timeOutElement = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');

priceElement.min = INITIAL_PRICE_AMOUNT;

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

const closeLeafletPopup = () => {
  const popupCloseButton = document.querySelector('.leaflet-popup-close-button');
  if (popupCloseButton) {popupCloseButton.click();}
};

const resetFormData = () => {
  adForm.reset();
  resetMainMarkerPosition();
  closeLeafletPopup();
  resetFilters();
};

const createPriceSlider = (minValue, maxValue, step, connectType) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue
    },
    step: step,
    start: minValue,
    connect: connectType,
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    }
  });
};

createPriceSlider(Number(priceElement.min), Number(priceElement.max), DEFAULT_SLIDER_STEP, 'lower');

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

accommodationTypeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN_ACCOMMODATION_PRICES[accommodationTypeElement.value],
      max: Number(priceElement.max),
    }
  });
});

const syncCheckinCheckoutTimes = () => {
  timeInElement.addEventListener('change', () => {
    timeOutElement.value = timeInElement.value;
  });

  timeOutElement.addEventListener('change', () => {
    timeInElement.value = timeOutElement.value;
  });
};

const validateForm = () => {
  const pristine = new Pristine(adForm, PRISTINE_CONFIG, true);

  pristine.addValidator(roomNumberFormElement, (value) => ALLOWED_CAPACITIES_PER_ROOM_NUMBER[value].includes(capacityElement.value),
    'Такое количество комнат не подойдет', 1, true);

  pristine.addValidator(capacityElement, (value) => ALLOWED_CAPACITIES_PER_ROOM_NUMBER[roomNumberFormElement.value].includes(value),
    'Столько гостей нельзя', 2, true);

  pristine.addValidator(accommodationTypeElement, (value) => {
    priceElement.min = MIN_ACCOMMODATION_PRICES[value];
    priceElement.placeholder = priceElement.min;
    if (priceElement.value >= priceElement.min) {
      return true;
    }
    return false;
  }, 'Не подходящий тип жилья для такой цены', 2, false);

  pristine.addValidator(priceElement, (value) => {
    if (value >= priceElement.min) {
      return true;
    }
    return false;
  }, 'Такая цена не подойдет', 2, true);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formIsValid = pristine.validate();
    if (formIsValid) {
      disableSubmitButton();
      sendData(
        () => {enableSubmitButton(); resetFormData(); showSuccessMessage();},
        () => {enableSubmitButton(); showErrorMessage();},
        formData
      );
    }
  });
};

const makePageInactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });
};

const makePageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });
};

export { makePageInactive, makePageActive, validateForm, syncCheckinCheckoutTimes, resetFormData };
