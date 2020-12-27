'use strict';

(function () {
  var URL = {
    load: 'https://javascript.pages.academy/code-and-magick/data',
    save: 'https://javascript.pages.academy/code-and-magick'
  };

  var METHOD = {
    post: 'POST',
    get: 'GET'
  };

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200: onSuccess(xhr.response);
          break;

        default: onError('Произошла ошибка подключения. Загружены mock-данные');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка подключения. Загружены mock-данные');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышен лемит времени. Загружены mock-данные');
    });

    xhr.timeout = 10000;

    xhr.open(METHOD.get, URL.load);
    xhr.send();
  }

  function save(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open(METHOD.post, URL.save);
    xhr.send();
  }

  window.backend = {
    load: load,
    save: save
  };
})();
