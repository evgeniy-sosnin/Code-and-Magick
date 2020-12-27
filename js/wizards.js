'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  var setupWizardForm = setup.querySelector('.setup-wizard-form');

  function renderWizard(obj) {
    var wizardTemplate = similarWizardTemplate.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = obj.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = obj.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = obj.colorEyes;
    return wizardTemplate;
  }

  function fillWizards(arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item, index) {
      if (index < 4) {
        fragment.appendChild(renderWizard(item));
      }
    });

    setupSimilarList.appendChild(fragment);
  }

  function errorMessage(str) {
    fillWizards(window.mockData.get(window.settings));
    var messageNode = document.createElement('div');
    var bodyNode = document.body;
    messageNode.style.width = '100%';
    messageNode.style.lineHeight = '30px';
    messageNode.style.fontSize = '24px';
    messageNode.style.padding = '20px 30px';
    messageNode.style.textAlign = 'center';
    messageNode.style.backgroundColor = 'red';
    messageNode.textContent = str;
    messageNode.style.order = '-1';
    bodyNode.style.display = 'flex';
    bodyNode.style.flexDirection = 'column';

    bodyNode.appendChild(messageNode);
  }

  function onOpenSetup() {
    setupSimilar.classList.remove('hidden');

    setup.classList.remove('hidden');
    document.addEventListener('keydown', onCloseSetupEscEvent);
    window.backend.load(fillWizards, errorMessage);
  }

  setupWizardForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardForm), function (response) {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });

  function onCloseSetup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onCloseSetupEscEvent);
    setupSimilarList.textContent = '';
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
