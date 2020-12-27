'use strict';

(function () {
  function generateName(obj) {
    return obj.name[window.utils.random(obj.name.length - 1)] + ' ' + obj.surname[window.utils.random(obj.surname.length - 1)];
  }

  function generateDate(obj) {
    var arr = [];
    for (var i = 0; i < obj.count; i++) {
      arr.push({
        name: generateName(obj),
        colorCoat: obj.color.coat[window.utils.random(obj.color.coat.length - 1)],
        colorEyes: obj.color.coat[window.utils.random(obj.color.coat.length - 1)]
      });
    }
    return arr;
  }

  window.mockData = {
    get: generateDate
  };
})();
