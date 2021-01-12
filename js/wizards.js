'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupWizardForm = setup.querySelector('.setup-wizard-form');

  var currentCoatColor;
  var currentEyesColor;
  var wizards = [];

  function renderWizard(obj) {
    var wizardTemplate = similarWizardTemplate.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = obj.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = obj.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = obj.colorEyes;
    return wizardTemplate;
  }

  function fillWizards(arr) {
    var fragment = document.createDocumentFragment();
    console.log(arr);
    for(var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(arr[i]))
    }
    setupSimilarList.appendChild(fragment);
  }

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    setupSimilarList.textContent = '';
    fillWizards(wizards.sort(function (left, right) {
      var rankDiff =  getRank(right) - getRank(left);
      if(rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  window.wizard.onEyesChange = window.debounce(function (color) {
    currentEyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    currentCoatColor = color;
    updateWizards();
  });

  function successUpload(data) {
    wizards = data;
    updateWizards();
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
    window.backend.load(successUpload, errorMessage);
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
