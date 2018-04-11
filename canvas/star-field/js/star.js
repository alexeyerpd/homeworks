'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const x = canvas.clientWidth;
const y = canvas.clientHeight;
const PI = Math.PI;
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

document.addEventListener('DOMContentLoaded', firstField)
canvas.addEventListener('click', action);

function action(event) {
  firstField();
}

function createStars() {
  ctx.beginPath();
  ctx.fillStyle = colors[randomValue(0,2)];
  ctx.globalAlpha = randomValue(0.8, 1);
  ctx.arc(randomValue(0,x), randomValue(0,y), randomSize(), 0, 2 * PI);
  ctx.closePath();
  ctx.fill()
}

function firstField() {
  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, x, y);
  ctx.closePath();

  const quantityStars = randomValue();
  for (let i = 0; i < quantityStars; i++) {
    createStars();
  }
}

function randomValue(min = 200, max = 400) {
  return Math.round(Math.random()*(max - min)) + min;
}

function randomSize(min = 0, max = 1.1) {
  return (Math.random()*(max - min)) + min
}