'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 20;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const FONT_SIZE = 16;
const TEXT_WIDTH = 40;
const barHeight = CLOUD_HEIGHT - GAP - TEXT_WIDTH - GAP;
const PLAYER_COLOR = `rgba(255, 0, 0, 1)`;

// функция для отрисовки белого окна и тени
let renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция для нахождения максимального результата времени
const getMaxElement = (arr) => {
  let maxElement = arr[0];

  // Если на какой-нибудь из итераций цикла текущий элемент окажется больше максимального, заменим им максимальный элемент и продолжим поиски. Так, после работы алгоритма, в переменной maxElement будет находиться элемент больше которого в массиве не оказалось никакого элемента.

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(ctx, CLOUD_X + CLOUD_Y, CLOUD_Y * 2, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  // текст
  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + TEXT_WIDTH + CLOUD_Y, CLOUD_Y + 15);
  ctx.fillText(`Список результатов:`, CLOUD_X + TEXT_WIDTH + CLOUD_Y, CLOUD_Y + GAP + 10);

  const maxTime = getMaxElement(times);

  // функция для возврата рандомного цвета
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const getRandomColor = () => {
    return `hsl(244,` + getRandomNumber(100) + `%, 50%)`;
  };

  // цикл для отрисовки каждой гистограммы
  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(Math.round(times[i]), CLOUD_X + CLOUD_Y + GAP + (BAR_GAP + BAR_WIDTH) * i, (CLOUD_X - FONT_SIZE + GAP) + (BAR_HEIGHT - (barHeight * times[i]) / maxTime) - 5);
    ctx.fillText(players[i], CLOUD_X + CLOUD_Y + GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_X + BAR_HEIGHT + GAP);

    ctx.fillStyle = players[i] === `Вы` ? PLAYER_COLOR : getRandomColor();
    ctx.fillRect(CLOUD_X + CLOUD_Y + GAP + (BAR_GAP + BAR_WIDTH) * i, (CLOUD_X - FONT_SIZE + GAP) + (BAR_HEIGHT - (barHeight * times[i]) / maxTime),
        BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};
