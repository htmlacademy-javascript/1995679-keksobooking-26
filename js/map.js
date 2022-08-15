import { makePageActive } from './form.js';

const ADDRESS_PRECISION = 5;
const addressElement = document.querySelector('#address');
const fillInAddressValue = (address) => {
  addressElement.value = `lat: ${address.lat.toFixed(ADDRESS_PRECISION)}, lng: ${address.lng.toFixed(ADDRESS_PRECISION)}`;
};

const createInteractiveMap = (coordinates) => {
  const map = L.map('map-canvas')
  .on('load', () => {
    makePageActive();
  })
  .setView({
    lat: coordinates.lat,
    lng: coordinates.lng,
  }, coordinates.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

return map
};

const createPinIcon = (pinIconData) => {
  const pinIcon = L.icon({
    iconUrl: pinIconData.iconUrl,
    iconSize: [pinIconData.iconWidth, pinIconData.iconHeight],
    iconAnchor: [pinIconData.iconWidth/2, pinIconData.iconHeight]
  });

  return pinIcon
};

const createPinMarker = (icon, position, isDraggable) => {
  const pinMarker = L.marker(
    {
      lat: position.lat,
      lng: position.lng,
    },
    {
      draggable: isDraggable,
      icon: icon
    }
  );

  return pinMarker;
};

const addMainMarkerToMap = (marker, map) => {
  marker.addTo(map);
  fillInAddressValue(marker.getLatLng());

  marker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    fillInAddressValue(coordinates);
  });
};

const addMarkerResetPositionHandler = (button, marker, position) => {
  const resetMarkerPosition = () => {
    marker.setLatLng({
      lat: position.lat,
      lng: position.lng,
    });
  }
  button.addEventListener('click', resetMarkerPosition);
};

const addMapResetPositionHandler = (button, map, position) => {
  const resetMapPosition = () => {
    map.setView({
      lat: position.lat,
      lng: position.lng,
    }, position.scale)
  }
  button.addEventListener('click', resetMapPosition);
};

export { createInteractiveMap, createPinIcon, createPinMarker, addMainMarkerToMap, addMarkerResetPositionHandler, addMapResetPositionHandler};
