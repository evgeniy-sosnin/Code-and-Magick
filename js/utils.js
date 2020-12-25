'use strict';

(function () {
  function getMaxValue(arr) {
    var max = -Infinity;

    arr.forEach(function (item) {
      if (item > max) {
        max = item;
      }
    });
    return Math.round(max);
  }

  function getRandomValue(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  window.utils = {
    random: getRandomValue,
    maxValue: getMaxValue
  };
})();
