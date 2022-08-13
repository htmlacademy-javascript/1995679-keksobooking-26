import { getCardData, renderOfferCard } from './get-offers.js';
import { makePageInactive, makePageActive, validateForm, syncCheckinCheckoutTimes } from './form.js';

const cardData = getCardData();
renderOfferCard(cardData);

makePageInactive();
makePageActive();
validateForm();
syncCheckinCheckoutTimes();
