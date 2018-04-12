'use strict';

const PI = Math.PI;
const html = document.querySelector('html')
const wall = document.querySelector('#wall');

wall.width = html.clientWidth;
wall.height = html.clientHeight;

const wallX = wall.clientWidth;
const wallY = wall.clientHeight;
const ctx = wall.getContext('2d');

function nextPoint1(x, y, time = Date.now()) { // функция времени 1
  return {
    x: this.x + Math.sin((50 + this.x + (time / 10)) / 100) * 3,
    y: this.y + Math.sin((45 + this.x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time = Date.now()) { // функция времени 2
  return {
    x: this.x + Math.sin((this.x + (time / 10)) / 100) * 5,
    y: this.y + Math.sin((10 + this.x + (time / 10)) / 100) * 2
  }
}

function random(min, max) {
  return (Math.random() * (max - min)) + min;
}


class Circle {
  constructor(x, y, size = random(0.1, 0.6)) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  create({x, y}) {
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5 * this.size;

    ctx.arc(x, y, (this.size * 12), 0, 2 * PI);
    ctx.stroke()
  }
}

class Cross {
  constructor(x, y, speed = random(-0.2, 0,2), size = random(0.1, 0.6) * 20) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.degree = 0;
    this.size = size;
  }

  create() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    this.checkRotate();

    ctx.rotate(this.degree);
    ctx.strokeStyle = '#fff';

    const centerX = 0;
    const centerY = 0;

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + this.size, centerY);

    ctx.moveTo(centerX, centerY);
    ctx.lineTo( centerX - this.size, centerY);

    ctx.moveTo(centerX, centerY);
    ctx.lineTo( centerX, centerY + this.size);

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - this.size);

    ctx.stroke();
    ctx.restore();
  }

  checkRotate() {
    if (this.degree > (2 * PI)) {
      this.degree = 0;
    }

    this.degree += this.speed;
  }
}

const quantity = Math.round(random(50, 200));
const arrayCircles = [];
const arrayCross = [];

for (let i = 0; i < (quantity / 2); i++) {
  const circle = new Circle(random(0, wallX),random(0, wallY));
  circle.animations = [nextPoint1, nextPoint2][Math.round(Math.random())];
  arrayCircles.push(circle)
}

for (let i = 0; i < (quantity / 2); i++) {
  const cross = new Cross(random(0, wallX),random(0, wallY));
  cross.animations = [nextPoint1, nextPoint2][Math.round(Math.random())];

  arrayCross.push(cross)
}

const objects =  arrayCircles.concat(arrayCross);

setInterval(() => {
  ctx.clearRect(0,0, wall.width, wall.height);
  objects.forEach((obj, ind) => {
    obj.create(obj.animations())
  })
}, 50);
