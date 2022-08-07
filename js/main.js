import { generateItem } from './data.js';

const AMOUNT_OF_TEMP_ITEMS = 10;

for (let i = 1; i <= AMOUNT_OF_TEMP_ITEMS; i++) {
  generateItem(i);
}
