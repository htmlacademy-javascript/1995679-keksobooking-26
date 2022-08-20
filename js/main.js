import { makePageInactive, validateForm, syncCheckinCheckoutTimes } from './form.js';
import { createInteractiveMap, createPinIcon, createPinMarker, addMainMarkerToMap, addMarkerResetPositionHandler, addMapResetPositionHandler, setMarkerPosition, setMapPosition } from './map.js';
import { renderOfferCard } from './get-offers.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const INITIAL_MAP_POSITION = {
  lat: 35.66560,
  lng: 139.79112,
  scale: 10,
};

const INITIAL_MAIN_MARKER_POSITION = {
  lat: 35.66560,
  lng: 139.79112
};

const MAIN_PIN_ICON_DATA = {
  iconUrl: './img/main-pin.svg',
  iconWidth: 52,
  iconHeight: 52
};

const EXTRA_PIN_ICON_DATA = {
  iconUrl: './img/pin.svg',
  iconWidth: 40,
  iconHeight: 40
};

const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');

makePageInactive();
validateForm();
syncCheckinCheckoutTimes();

const map = createInteractiveMap(INITIAL_MAP_POSITION);
const mainPinIcon = createPinIcon(MAIN_PIN_ICON_DATA);
const extraPinIcon = createPinIcon(EXTRA_PIN_ICON_DATA);
const mainPinMarker = createPinMarker(mainPinIcon, INITIAL_MAIN_MARKER_POSITION, true);

addMainMarkerToMap(mainPinMarker, map);
addMarkerResetPositionHandler(resetButton, mainPinMarker, INITIAL_MAIN_MARKER_POSITION);
addMapResetPositionHandler(resetButton, map, INITIAL_MAP_POSITION);

const markerGroup = L.layerGroup().addTo(map);

getData(
  (data) => {
    data.forEach((element) => {
      const customMarker = createPinMarker(extraPinIcon, element.location, false);
      customMarker.addTo(markerGroup).bindPopup(renderOfferCard(element));
    })
  },
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);
