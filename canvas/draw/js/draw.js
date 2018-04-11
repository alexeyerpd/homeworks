'use strict';

const html = document.querySelector('html');
const canvas = document.querySelector('#draw');
const PI = Math.PI;
canvas.width = html.clientWidth;
canvas.height = html.clientHeight;

let drawing = false;
let needsRepaint = false;
let shiftKey = false;
let curves = [];
let colorValue = 0;
let lineSize = 100;
let decreaseLineSize = true;
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up);
canvas.addEventListener('mousemove', move);
canvas.addEventListener('dblclick', clearField);
canvas.addEventListener('mouseleave', leave);
document.addEventListener('keydown', e => {
  if (e.repeat) {
    return;
  }

  if (e.key === 'Shift') {
    shiftKey = true
  }
});
document.addEventListener('keyup', e => {
  if (e.key === 'Shift') {
    shiftKey = false
  }
});

window.addEventListener('resize', (e) => { //реакция на изменения окна браузера
  canvas.width = html.clientWidth;
  canvas.height = html.clientHeight;
  curves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height)
});

function leave(event) {
  if (event.buttons === 1) {
    curves.pop();
    needsRepaint = true;
    drawing = false;
  }
}

function clearField(event) {
  curves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function move(event) {
  if (drawing) {
    const point = makePoint(event.offsetX, event.offsetY);

    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
}

function down(event) {
  drawing = true;
  const curve = [];

  curve.push(makePoint(event.offsetX, event.offsetY))

  curves.push(curve)
  needsRepaint = true;

}

function up(event) {
  drawing = false;
}

function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${point.hue},100%,50%)`
  ctx.arc(...point, point.size/2, 0, 2 * PI);
  ctx.fill()
}

function makePoint(x, y) {
  const point = [x, y];
  point.hue = colorValue;
  point.size = lineSize;
  return point;
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // ctx.moveTo(...points[0]);

  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);

  }

  ctx.stroke();
}

function smoothCurveBetween (p1, p2) {
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${p1.hue},100%,50%)`;
  ctx.lineWidth = p1.size;

  ctx.quadraticCurveTo(...p1, ...p2);
  ctx.stroke();
}

function repaint () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves
    .forEach((curve) => {
      circle(curve[0]);
      smoothCurve(curve);
    });
}

function tick () {
  randomColor();
  randomSize();

  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

function randomColor() {
  colorValue = colorValue > 359 ? 0 : colorValue;
  colorValue = colorValue < 0 ? 359 : colorValue;
  if (shiftKey) {
    colorValue--;

  } else {
    colorValue++;
  }
}

function randomSize() {

  if (lineSize < 5) {
    lineSize = 5;
    decreaseLineSize = false;
  } else if (lineSize > 100) {
    lineSize = 100;
    decreaseLineSize = true;
  }
  if (decreaseLineSize) {
    lineSize--;
  } else {
    lineSize++;
  }
}

tick();