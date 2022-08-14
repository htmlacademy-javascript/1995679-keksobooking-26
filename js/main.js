import { makePageInactive, validateForm, syncCheckinCheckoutTimes } from './form.js';
import { createMap } from './map.js';

makePageInactive();
validateForm();
syncCheckinCheckoutTimes();

createMap();
