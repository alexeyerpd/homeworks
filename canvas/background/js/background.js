'use strict';

const PI = Math.PI;
const html = document.querySelector('html')
const wall = document.querySelector('#wall');

wall.width = html.clientWidth;
wall.height = html.clientHeight;

const wallX = wall.clientWidth;
const wallY = wall.clientHeight;
const ctx = wall.getContext('2d');

function nextPoint1(x, y, time) { // функция времени 1
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time) { // функция времени 2
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function circle(x, y) {
  ctx.beginPath();

  const size = random(0.1, 0.6);

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5 * size;
  ctx.arc(x, y, (12 * size), 0, 2 * PI);
  ctx.stroke()
}

function cross(x, y) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.017 * random(0, 360))
  ctx.strokeStyle = '#fff'
  const size = random(0.1, 0.6) * 20;
  const centerX = 0;
  const centerY = 0;

  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX + size, centerY);

  ctx.moveTo(centerX, centerY)
  ctx.lineTo( centerX - size, centerY);

  ctx.moveTo(centerX, centerY)
  ctx.lineTo( centerX, centerY + size);

  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX, centerY - size);

  ctx.stroke();
  ctx.restore();
}

function random(min, max) {
  return (Math.random() * (max - min)) + min;
}


const quantity = Math.round(random(50, 200));
const arrayCircles = [];
const arrayCross = [];

for (let i = 0; i < (quantity / 2); i++) {
  let {x, y} = [nextPoint1(random(0, wallX), random(0, wallY), Date.now()), nextPoint2(random(0, wallX), random(0, wallY), Date.now())][Math.round(Math.random())];

  arrayCircles.push({x, y})
}

for (let i = 0; i < (quantity / 2); i++) {
  let {x, y} = [nextPoint1(random(0, wallX), random(0, wallY), Date.now()), nextPoint2(random(0, wallX), random(0, wallY), Date.now())][Math.round(Math.random())];

  arrayCross.push({x, y})
}


arrayCircles.forEach(({x, y}, ind) => {
  setInterval(() => {
    ctx.clearRect(x - 6, y - 6, x + 6, y + 6);
    circle(x, y);
  }, 20)
})

arrayCross.forEach(({x, y}, ind) => {
  setInterval(() => {
    ctx.clearRect(x - 8, y - 8, x + 8, y + 8);
    cross(x, y);
  }, 20)

})




