import { generateItem } from './data.js';

const ACCOMMODATION_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const popupCardTemplate = document.querySelector('#card').content;
const cardPhotoTemplate = document.querySelector('#card-photo-template').content;

const getCardData = () => generateItem(4);

const renderFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((element) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${element}`);
    featuresFragment.appendChild(featureElement);
  });

  return featuresFragment;
};

const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = cardPhotoTemplate.cloneNode(true);
    const photoImgElement = photoElement.querySelector('.popup__photo');
    photoImgElement.src = photo;
    photosFragment.appendChild(photoElement);
  });

  return photosFragment;
};

const renderOfferCard = (cardData) => {

  const offerElement = document.createElement('div');

  const popupCardElement = popupCardTemplate.cloneNode(true);
  const popupAvatarElement = popupCardElement.querySelector('.popup__avatar');
  const popupTitleElement = popupCardElement.querySelector('.popup__title');
  const popupAddressElement = popupCardElement.querySelector('.popup__text--address');
  const popupPriceElement = popupCardElement.querySelector('.popup__text--price');
  const popupTypeElement = popupCardElement.querySelector('.popup__type');
  const popupCapacityElement = popupCardElement.querySelector('.popup__text--capacity');
  const popupTimeElement = popupCardElement.querySelector('.popup__text--time');
  const popupFeaturesElement = popupCardElement.querySelector('.popup__features');
  const popupDescriptionElement = popupCardElement.querySelector('.popup__description');
  const popupPhotosElement = popupCardElement.querySelector('.popup__photos');

  popupAvatarElement.src = cardData.author.avatar;
  popupTitleElement.textContent = cardData.offer.title;
  popupAddressElement.textContent = `${cardData.offer.address.lat},${cardData.offer.address.lng}`;
  popupPriceElement.textContent = `${cardData.offer.price} ₽/ночь`;
  popupTypeElement.textContent = ACCOMMODATION_TYPES[cardData.offer.type];
  popupCapacityElement.textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  popupTimeElement.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  popupFeaturesElement.appendChild(renderFeatures(cardData.offer.features));
  popupDescriptionElement.textContent = cardData.offer.description;
  popupPhotosElement.appendChild(renderPhotos(cardData.offer.photos));

  offerElement.appendChild(popupCardElement);

  return offerElement;
};

export { getCardData, renderOfferCard };

