'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  function generateName(obj) {
    return obj.name[window.utils.random(obj.name.length - 1)] + ' ' + obj.surname[window.utils.random(obj.surname.length - 1)];
  }

  function generateDate(obj) {
    var arr = [];
    for (var i = 0; i < obj.count; i++) {
      arr.push({
        name: generateName(obj),
        coatColor: obj.color.coat[window.utils.random(obj.color.coat.length - 1)],
        eyesColor: obj.color.coat[window.utils.random(obj.color.coat.length - 1)]
      });
    }
    return arr;
  }

  function renderWizard(obj) {
    var wizardTemplate = similarWizardTemplate.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = obj.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = obj.coatColor;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
    return wizardTemplate;
  }

  function fillWizards(arr) {
    var setupSimilar = document.querySelector('.setup-similar');
    var setupSimilarList = document.querySelector('.setup-similar-list');
    setupSimilar.classList.remove('hidden');

    var fragment = document.createDocumentFragment();

    arr.forEach(function (item) {
      fragment.appendChild(renderWizard(item));
    });

    setupSimilarList.appendChild(fragment);
  }

  fillWizards(generateDate(window.settings));

  function onOpenSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseSetupEscEvent);
  }

  function onCloseSetup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseSetupEscEvent);
  }

  function onCloseSetupEscEvent(evt) {
    window.events.esc(evt, onCloseSetup);
  }

  function onOpenPopupEnterEvent(evt) {
    window.events.enter(evt, onOpenSetup);
  }

  function onCloseSetupEnterEvent(evt) {
    window.events.enter(evt, onCloseSetup);
  }

  setupOpen.addEventListener('click', onOpenSetup);
  setupOpen.addEventListener('keydown', onOpenPopupEnterEvent);
  setupClose.addEventListener('click', onCloseSetup);
  setupClose.addEventListener('keydown', onCloseSetupEnterEvent);
})();
