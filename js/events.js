'use strict';

(function () {
  function isEnterEvent(evt, action) {
    if (evt.keyCode === window.settings.keyCode.enter) {
      action();
    }
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === window.settings.keyCode.esc) {
      action();
    }
  }

  window.events = {
    esc: isEscEvent,
    enter: isEnterEvent
  };
})();
