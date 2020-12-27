'use strict';
(function () {
  window.settings = {
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
    },
    keyCode: {
      enter: 13,
      esc: 27
    },
    stat: {
      heightCloud: 270,
      widthCloud: 420,
      x: 100,
      y: 10,
      cloudStep: 10,

      stepColumn: 50,
      heightColumn: 150,
      widthColumn: 40,
      lineHeight: 20,

      offset: {
        top: 15,
        left: 50,
        bottom: 20
      },

      userColor: 'rgba(255, 0, 0, 1)',
      allColor: 'hsl(240, 100%, ',

      title: {
        content: [
          'Ура вы победили!',
          'Список результатов:'
        ],
        color: 'rgba(0, 0, 0, 0.7)'
      },

      colorCloud: [
        'rgba(0, 0, 0, 0.7)',
        'rgba(255, 255, 255, 1)'
      ]
    }
  };
})();
