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

const ALLOWED_CAPACITIES_PER_ROOM_NUMBER = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const DEFAULT_SLIDER_STEP = 1;

const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');
const mapFiltersFormSelectElements = mapFiltersFormElement.querySelectorAll('select');
const roomNumberFormElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const accommodationTypeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');

priceElement.min = '1000';

const priceSlider = (minValue, maxValue, step, connectType) => {
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

priceSlider(+priceElement.min, +priceElement.max, DEFAULT_SLIDER_STEP, 'lower');

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
      max: +priceElement.max,
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
  const pristine = new Pristine(adFormElement, PRISTINE_CONFIG, true);

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

export { makePageInactive, makePageActive, validateForm, syncCheckinCheckoutTimes };
