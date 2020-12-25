'use strict';
(function (){
  function renderCloud(ctx, obj) {
    obj.colorCloud.forEach(function (item, index) {
      ctx.fillStyle = item;
      ctx.fillRect(obj.x - obj.cloudStep * index, obj.y - obj.cloudStep * index, obj.widthCloud, obj.heightCloud);
    });
  }

  function getHistogrammPercent(value, height) {
    return height / window.utils.maxValue(value);
  }

  function getColorUser(value, obj) {
    return value === 'Вы' ? obj.userColor : obj.allColor + window.utils.random(0, 100) + '%)';
  }

  function renderColumn(ctx, name, time, index, obj, percent) {
    ctx.fillStyle = getColorUser(name, obj);
    ctx.fillText(name, 150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom + obj.lineHeight * 2 + obj.heightColumn));
    ctx.fillRect(150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom + obj.lineHeight), obj.widthColumn, -time * percent);
    ctx.fillText(Math.floor(time), 150 + (obj.widthColumn + obj.stepColumn) * index, (obj.heightCloud + obj.y) - (obj.offset.bottom));
  }

  function renderHistogram(ctx, userNames, userTimes, obj) {
    var stepPercent = getHistogrammPercent(userTimes, obj.heightColumn);

    for (var i = 0; i < userNames.length; i++) {
      renderColumn(ctx, userNames[i], userTimes[i], i, obj, stepPercent)
    }
  }

  function renderTitle (ctx, obj) {
    ctx.fillStyle = obj.title.color;

    obj.title.content.forEach(function (item, index) {
      ctx.fillText(item, obj.x + obj.offset.left, obj.y + obj.offset.top + obj.lineHeight * index);
    })
  }

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, window.settings.stat);

    renderTitle(ctx, window.settings.stat);
    renderHistogram(ctx, names, times, window.settings.stat);
  };
})();
