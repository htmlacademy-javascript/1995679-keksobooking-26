import { makePageInactive, validateForm, syncCheckinCheckoutTimes, resetFormData } from './form.js';
import { createInteractiveMap, createPinIcon, createPinMarker } from './map.js';
import { renderOfferCard } from './get-offers.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const EXTRA_PIN_ICON_DATA = {
  iconUrl: './img/pin.svg',
  iconWidth: 40,
  iconHeight: 40
};

makePageInactive();
validateForm();
syncCheckinCheckoutTimes();

const map = createInteractiveMap();
const extraPinIcon = createPinIcon(EXTRA_PIN_ICON_DATA);
const markerGroup = L.layerGroup().addTo(map);

getData(
  (data) => {
    data.forEach((element) => {
      const customMarker = createPinMarker(extraPinIcon, element.location, false);
      customMarker.addTo(markerGroup).bindPopup(renderOfferCard(element));
    });
  },
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormData();
});
