import { getCardData, renderOfferCard } from './get-offers.js';
import { makePageInactive, makePageActive } from './form.js';

const cardData = getCardData();
renderOfferCard(cardData);

makePageInactive();

makePageActive();
