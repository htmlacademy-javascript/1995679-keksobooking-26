import { getCardData, renderOfferCard } from './get-offers.js';
import { makePageActive } from './form.js';

const INITIAL_MAP_POSITION = {
  lat: 35.66560,
  lng: 139.79112,
  scale: 10,
};

const INITIAL_MARKER_POSITION = {
  lat: 35.66560,
  lng: 139.79112
};

const ADDRESS_PRECISION = 5;

const resetButton = document.querySelector('.ad-form__reset');
const addressElement = document.querySelector('#address');

const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      makePageActive();
    })
    .setView({
      lat: INITIAL_MAP_POSITION.lat,
      lng: INITIAL_MAP_POSITION.lng,
    }, INITIAL_MAP_POSITION.scale);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const extraPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    {
      lat: INITIAL_MARKER_POSITION.lat,
      lng: INITIAL_MARKER_POSITION.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  const fillInAddressValue = (address) => {
    addressElement.value = `lat: ${address.lat.toFixed(ADDRESS_PRECISION)}, lng: ${address.lng.toFixed(ADDRESS_PRECISION)}`;
  };

  mainPinMarker.addTo(map);
  fillInAddressValue(mainPinMarker.getLatLng());

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    fillInAddressValue(coordinates);
  });

  const resetMainMarkerPosition = () => {
    mainPinMarker.setLatLng({
      lat: INITIAL_MARKER_POSITION.lat,
      lng: INITIAL_MARKER_POSITION.lng,
    });
  };

  const resetMapPotision = () => {
    map.setView({
      lat: INITIAL_MAP_POSITION.lat,
      lng: INITIAL_MAP_POSITION.lng,
    }, INITIAL_MAP_POSITION.scale);
  };

  resetButton.addEventListener('click', resetMainMarkerPosition);
  resetButton.addEventListener('click', resetMapPotision);

  const markerGroup = L.layerGroup().addTo(map);

  const createCustomMarker = (data) => {
    const marker = L.marker(
      {
        lat: data.offer.address.lat,
        lng: data.offer.address.lng,
      },
      {
        icon: extraPinIcon,
      });

    marker.addTo(markerGroup).bindPopup(renderOfferCard(data));
  };

  for (let i = 0; i <10; i++) {
    createCustomMarker(getCardData());
  }
};

export { createMap };
