// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const DEFAULT_FLOAT_PRECISION = 1;

const getRandomPositiveInteger = (min, max) => {
  if (max < min) {
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPositiveFloat = (min, max, precision = DEFAULT_FLOAT_PRECISION) => {
  if (max < min) {
    const swap = min;
    min = max;
    max = swap;
  }

  return (Math.random() * (max - min) + min).toFixed(precision);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const addZeroToOneDigitNumbers = (number) => {
  if (number.toString().length === 1) {
    return `0${number.toString()}`;
  }
  else {return number.toString();}
};

const shuffle = (elements) => {
  for (let i = 0; i < elements.length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const swap = elements[randomIndex];
    elements[randomIndex] = elements[i];
    elements[i] = swap;
  }
  return elements;
};

const getRandomAmountOfArrayElements = (elements) => {
  const randomAmountOfElements = getRandomPositiveInteger(0, elements.length);
  return shuffle(elements).slice(0,randomAmountOfElements);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { checkStringLength, getRandomArrayElement, shuffle, debounce, getRandomPositiveInteger, getRandomPositiveFloat, getRandomAmountOfArrayElements, addZeroToOneDigitNumbers };
