const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');
const mapFiltersFormSelectElements = mapFiltersFormElement.querySelectorAll('select');

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

export { makePageInactive, makePageActive };
