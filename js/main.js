import { makePageInactive, validateForm, syncCheckinCheckoutTimes, resetFormData } from './form.js';
import { createInteractiveMap, addMarkersToMap } from './map.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { filterOffers, makeFiltersElementActive, makeFiltersElementInactive, filterOffersHandler } from './filter-offers.js';
import { uploadPhotoHandler } from './upload-photos.js';

const DEFAULT_FILTER_SETTINGS = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: new Set(),
};

makePageInactive();
makeFiltersElementInactive();
validateForm();
syncCheckinCheckoutTimes();

const resetButton = document.querySelector('.ad-form__reset');
const uploadAvatarElement = document.querySelector('#avatar');
const previewAvatarElement = document.querySelector('#avatar-preview');
const uploadAccommodationPhotoElement = document.querySelector('#images');
const previewAccommodationPhotoElement = document.querySelector('#accommodation-preview');
const map = createInteractiveMap();
const markerGroup = L.layerGroup().addTo(map);

uploadPhotoHandler(uploadAvatarElement, previewAvatarElement);
uploadPhotoHandler(uploadAccommodationPhotoElement, previewAccommodationPhotoElement);

getData(
  (data) => {
    makeFiltersElementActive();
    const filteredOffers = filterOffers(data, DEFAULT_FILTER_SETTINGS);
    addMarkersToMap(filteredOffers, markerGroup);
    filterOffersHandler(markerGroup, data, addMarkersToMap);
  },
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormData();
});
