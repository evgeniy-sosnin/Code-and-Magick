'use strict';
(function (){
  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');


  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  function onChangeCoatColor() {
    var color = window.settings.color.coat[window.utils.random(window.settings.color.coat.length - 1)];
    wizardCoat.style.fill = color;
    setup.querySelector('input[name="coat-color"]').value = color;
    wizard.onCoatChange(color);
  }

  function onChangeEyesColor() {
    var color = window.settings.color.eyes[window.utils.random(window.settings.color.eyes.length - 1)];
    wizardEyes.style.fill = color;
    setup.querySelector('input[name="eyes-color"]').value = color;
    wizard.onEyesChange(color);
  }

  function onChangeFireballColor() {
    var color = window.settings.color.fireball[window.utils.random(window.settings.color.fireball.length - 1)];
    setupFireballWrap.style.background = color;
    setup.querySelector('input[name="fireball-color"]').value = color;
  }

  wizardCoat.addEventListener('click', onChangeCoatColor);
  wizardEyes.addEventListener('click', onChangeEyesColor);
  setupFireballWrap.addEventListener('click', onChangeFireballColor);
  window.wizard = wizard;
})();
