'use strict';
(function (){
  var setup = document.querySelector('.setup');

  var settings = {
    count: 4,
    name: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    surname: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг',
    ],
    color: {
      coat: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)'
      ],
      eyes: [
        'black',
        'red',
        'blue',
        'yellow',
        'green'
      ],
      fireball: [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'
      ]
    }
  };

  function getRandomValue(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  function generateName(obj) {
    return obj.name[getRandomValue(obj.name.length - 1)] + ' ' + obj.surname[getRandomValue(obj.surname.length - 1)];
  }

  function generateDate(obj) {
    var arr = [];
    for (var i = 0; i < obj.count; i++) {
      arr.push({
        name: generateName(obj),
        coatColor: obj.color.coat[getRandomValue(obj.color.coat.length - 1)],
        eyesColor: obj.color.coat[getRandomValue(obj.color.coat.length - 1)]
      });
    }
    return arr;
  }

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  setupSimilar.classList.remove('hidden');


  function renderWizard(obj) {
    var wizardTemplate = similarWizardTemplate.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = obj.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = obj.coatColor;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
    return wizardTemplate;
  }

  function fillWizzards(arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderWizard(item));
    });

    setupSimilarList.appendChild(fragment);
  }

  fillWizzards(generateDate(settings));

  // Module4-task1
  function isEnterEvent(evt, action) {
    if (evt.keyCode === 13) {
      action();
    }
  }
  function isEscEvent(evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  }

  function onOpenSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseSetupEscEvent);
  }

  function onCloseSetup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseSetupEscEvent);
  }

  function onCloseSetupEscEvent(evt) {
    isEscEvent(evt, onCloseSetup);
  }

  function onOpenPopupEnterEvent(evt) {
    isEnterEvent(evt, onOpenSetup);
  }

  function onCloseSetupEnterEvent(evt) {
    isEnterEvent(evt, onCloseSetup);
  }

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  setupOpen.addEventListener('click', onOpenSetup);
  setupOpen.addEventListener('keydown', onOpenPopupEnterEvent);
  setupClose.addEventListener('click', onCloseSetup);
  setupClose.addEventListener('keydown', onCloseSetupEnterEvent);

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

  function onChangeCoatColor() {
    var color = settings.color.coat[getRandomValue(settings.color.coat.length - 1)];
    wizardCoat.style.fill = color;
    setup.querySelector('[name]="coat-color"').value = color;
  }

  function onChangeEyesColor() {
    var color = settings.color.eyes[getRandomValue(settings.color.eyes.length - 1)];
    wizardEyes.style.fill = color;
    setup.querySelector('[name]="eyes-color"').value = color;
  }

  function onChangeFireballColor() {
    var color = settings.color.fireball[getRandomValue(settings.color.fireball.length - 1)];
    setupFireballWrap.style.background = color;
    setup.querySelector('[name]="fireball-color"').value = color;
  }

  wizardCoat.addEventListener('click', onChangeCoatColor);
  wizardEyes.addEventListener('click', onChangeEyesColor);
  setupFireballWrap.addEventListener('click', onChangeFireballColor);
})();
