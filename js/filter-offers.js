import { checkIfAllElementsArePresentInAnotherArray, isNumberWithingRange, debounce } from './util.js';

const MAX_AMOUNT_OF_OFFERS = 10;

const PRICE_LIST = {
  'any': {
    min: 0,
    max: Infinity,
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'low': {
    min: 0,
    max: 10000
  },
  'high': {
    min: 50000,
    max: Infinity
  }
};

const DEBOUNCE_DELAY = 500;

const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');
const mapFiltersFormSelectElements = mapFiltersFormElement.querySelectorAll('select');
const housingTypeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFiltersFormElement.querySelector('#housing-features');
const featuresElements = housingFeaturesElement.querySelectorAll('input');

const filterByType = (offers, type) => {
  if (type === 'any') {
    return offers;
  }
  else {
    return offers.filter((offer) => offer.offer.type === type);
  }
};

const filterByPrice = (offers, range) => offers.filter((offer) => isNumberWithingRange(Number(offer.offer.price), PRICE_LIST[range].min, PRICE_LIST[range].max));

const filterByRooms = (offers, rooms) => {
  if (rooms === 'any') {
    return offers;
  }
  else {
    return offers.filter((offer) => offer.offer.rooms === Number(rooms));
  }
};

const filterByAmountOfGuests = (offers, guests) => {
  if (guests === 'any') {
    return offers;
  }
  else {
    return offers.filter((offer) => offer.offer.guests === Number(guests));
  }
};

const filterByFeatures = (features, offers) => offers.filter((offer) => checkIfAllElementsArePresentInAnotherArray(Array.from(features), offer.offer.features));

const filterOffers = (offers, settings) => {
  let result = filterByType(offers, settings.type);
  result = filterByRooms(result, settings.rooms);
  result = filterByPrice(result, settings.price);
  result = filterByAmountOfGuests(result, settings.guests);
  result = filterByFeatures(settings.features, result);

  return result.slice(0,MAX_AMOUNT_OF_OFFERS);
};

const makeFiltersElementActive = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFeaturesElement.disabled = false;
  mapFiltersFormSelectElements.forEach((element) => {
    element.disabled = false;
  });
};

const makeFiltersElementInactive = () => {
  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFeaturesElement.disabled = true;
  mapFiltersFormSelectElements.forEach((element) => {
    element.disabled = true;
  });
};

const filterOffersHandler = (markerGroup, offers, action) => {
  let filteredOffers = [];
  const filterSettings = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: new Set(),
  };

  const applyFilter = () => {
    markerGroup.clearLayers();
    filteredOffers = filterOffers(offers, filterSettings);
    action(filteredOffers, markerGroup);
  };

  housingTypeElement.addEventListener('change', (evt) => {
    filterSettings.type = evt.target.value;
    debounce(applyFilter, DEBOUNCE_DELAY)();
  });

  housingRoomsElement.addEventListener('change', (evt) => {
    filterSettings.rooms = evt.target.value;
    debounce(applyFilter, DEBOUNCE_DELAY)();
  });

  housingPriceElement.addEventListener('change', (evt) => {
    filterSettings.price = evt.target.value;
    debounce(applyFilter, DEBOUNCE_DELAY)();
  });

  housingGuestsElement.addEventListener('change', (evt) => {
    filterSettings.guests = evt.target.value;
    debounce(applyFilter, DEBOUNCE_DELAY)();
  });

  housingFeaturesElement.addEventListener('click', (evt) => {
    if (evt.target.type === 'checkbox') {
      if (evt.target.checked === true) {
        filterSettings.features.add(evt.target.value);
      }
      else {
        filterSettings.features.delete(evt.target.value);
      }
      debounce(applyFilter, DEBOUNCE_DELAY)();
    }
  });
};

const resetFilters = () => {
  housingTypeElement.value = 'any';
  housingRoomsElement.value = 'any';
  housingPriceElement.value = 'any';
  housingGuestsElement.value = 'any';
  featuresElements.forEach((element) => {element.checked = false;});
};

export { filterOffers, makeFiltersElementActive, makeFiltersElementInactive, filterOffersHandler, resetFilters };
