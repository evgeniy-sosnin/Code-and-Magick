'use strict';

var settings = {
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
};

function renderCloud(ctx, obj) {
  obj.colorCloud.forEach(function (item, index) {
    ctx.fillStyle = item;
    ctx.fillRect(obj.x - obj.cloudStep * index, obj.y - obj.cloudStep * index, obj.widthCloud, obj.heightCloud);
  })
}

function getMaxValue (arr) {
  var max = -Infinity;

  arr.forEach(function (item) {
    if(item > max) {
      max = item;
    }
  });
  return Math.round(max);
};

function getHistogrammPercent (value, height) {
  return height / getMaxValue(value);
}

function getColorUser (value, obj) {
  return value === 'Вы' ?  obj.userColor : obj.allColor + getRandomValue(0, 100) + '%)';
}

function getRandomValue (min, max) {
  if(max === undefined) {
    max = min;
    min = 0;
  }
  return Math.round( min - 0.5 + Math.random() * (max - min + 1));
}

function renderColumn (ctx, name, time, index, obj, percent) {
  ctx.fillStyle = getColorUser(name, obj);
  console.log((obj.height + obj.y) - (obj.offset.bottom + obj.lineHeight * 2 + obj.heightColumn));
  ctx.fillText(name, 150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom + obj.lineHeight * 2 + obj.heightColumn));
  ctx.fillRect( 150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom + obj.lineHeight), obj.widthColumn , -time * percent );
  ctx.fillText(Math.floor(time), 150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom));
}

function renderHistogram (ctx, userNames, userTimes, obj) {
  var stepPercent = getHistogrammPercent(userTimes, obj.heightColumn);

  for (var i = 0; i < userNames.length; i++) {
    renderColumn(ctx, userNames[i], userTimes[i], i, obj, stepPercent)
  }
}

function renderTitle (ctx, obj) {
  ctx.fillStyle = obj.title.color;

  obj.title.content.forEach(function (item, index) {
    ctx.fillText(item, obj.x + obj.offset.left , obj.y + obj.offset.top + obj.lineHeight * index);
  })
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, settings);

  renderTitle(ctx, settings);
  renderHistogram(ctx, names, times, settings);
};
