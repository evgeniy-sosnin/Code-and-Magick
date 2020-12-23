'use strict';
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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
