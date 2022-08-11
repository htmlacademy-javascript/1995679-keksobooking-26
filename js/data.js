import { getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getRandomAmountOfArrayElements, addZeroToOneDigitNumbers } from './util.js';

const ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
const ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ACCOMMODATION_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MIN_TEMP_VALUE = 1;
const MAX_TEMP_VALUE = 100;

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const ACCOMMODATION_COORDINATES_PRECISION = 5;

const generateItem = (id = 1) => {
  const accommodationLatitude = getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE, ACCOMMODATION_COORDINATES_PRECISION);
  const accommodationLongitude = getRandomPositiveFloat(MIN_LONGITUDE, MAX_LONGITUDE, ACCOMMODATION_COORDINATES_PRECISION);

  const item = {
    author: {
      avatar: `img/avatars/user${addZeroToOneDigitNumbers(id)}.png`,
    },
    offer: {
      title: 'Offer Title',
      address: {
        lat: accommodationLatitude,
        lng: accommodationLongitude
      },
      price: getRandomPositiveInteger(MIN_TEMP_VALUE, MAX_TEMP_VALUE),
      type: getRandomArrayElement(ACCOMMODATION_TYPES),
      rooms: getRandomPositiveInteger(MIN_TEMP_VALUE, MAX_TEMP_VALUE),
      guests: getRandomPositiveInteger(MIN_TEMP_VALUE, MAX_TEMP_VALUE),
      checkin: getRandomArrayElement(CHECK_IN_TIMES),
      checkout: getRandomArrayElement(CHECK_IN_TIMES),
      features: getRandomAmountOfArrayElements(ACCOMMODATION_FEATURES),
      description: 'description placeholder',
      photos: getRandomAmountOfArrayElements(ACCOMMODATION_PHOTOS),
      location: {
        lat: accommodationLatitude,
        lng: accommodationLongitude,
      }
    },
  };

  return item;
};

export { generateItem };
