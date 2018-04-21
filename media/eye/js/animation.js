'use strict';
const html = document.querySelector('html');
const eye = document.querySelector('.big-book__pupil');

let mouseX, mouseY; // координаты курсора мышки с учетом смещения
let htmlX, htmlY; // текущий размер окна

let eyeCoords;
let centerX, centerY;

let lengthXLeftForEyeSize, lengthXRightForEyeSize, lengthYTopForEyeSize, lengthYBottomForEyeSize; //Переменные для размера значка
let factorXLeft, factorXRight, factorYTop, factorYBottom; // коэффициенты смещения

document.addEventListener('mousemove', getEye);
document.addEventListener('scroll', reSize);
window.addEventListener('resize', reSize);

function allDataForCoords() {
  htmlX = html.clientWidth;
  htmlY = html.clientHeight;

  eyeCoords = eye.getBoundingClientRect();

  centerX = eyeCoords.left + (eyeCoords.width / 2);
  centerY = eyeCoords.top + (eyeCoords.height / 2);

  lengthXLeftForEyeSize = - (eyeCoords.left + (eyeCoords.width / 2));
  lengthXRightForEyeSize = htmlX - (eyeCoords.left + (eyeCoords.width / 2));
  lengthYTopForEyeSize = - (eyeCoords.top + (eyeCoords.height / 2));
  lengthYBottomForEyeSize = htmlY - (eyeCoords.top + (eyeCoords.height / 2));

  factorXLeft = 30 / ( eyeCoords.left + (eyeCoords.width / 2) );
  factorXRight = 30 / ( htmlX - (eyeCoords.left + (eyeCoords.width / 2)) );
  factorYTop = 30 / ( eyeCoords.top + (eyeCoords.height / 2) );
  factorYBottom = 30 / ( htmlY - (eyeCoords.top + (eyeCoords.height / 2)) );
}

function reSize(event) {
  allDataForCoords();
}

function getEye(event) {
  event.preventDefault();

  mouseX = (event.clientX - centerX);
  mouseY = (event.clientY - centerY);

  eye.style.setProperty('--pupil-x', `${offsetPupilX(mouseX)}px`);
  eye.style.setProperty('--pupil-y', `${offsetPupilY(mouseY)}px`);
  
  setEyeSize(mouseX, mouseY);
}

function offsetPupilX(mouseX) {
  if (mouseX > 0) {
    return mouseX * factorXRight;
  } else {
    return mouseX * factorXLeft;
  }
}

function offsetPupilY(mouseY) {
  if (mouseY > 0) {
    return mouseY * factorYBottom;
  } else {
    return mouseY * factorYTop;
  }
}

function setEyeSize(mouseX, mouseY) {
  if (isEyeSize3(mouseX, mouseY)) {
    eye.style.setProperty('--pupil-size', 3);
  } else if (isEyeSize2(mouseX, mouseY)) {
    eye.style.setProperty('--pupil-size', 2);
  } else if (isEyeSize1(mouseX, mouseY)) {
    eye.style.setProperty('--pupil-size', 1);
  }
}

function isEyeSize1(x, y) {
  if (
    (x < lengthXLeftForEyeSize * 0.6) ||
    (x > lengthXRightForEyeSize * 0.6) ||
    (y < lengthYTopForEyeSize * 0.6) ||
    (y > lengthYBottomForEyeSize * 0.6)
  ) {
    return true;
  } else {
    return false;
  }
}

function isEyeSize2(x, y) {
  if (
    (x > lengthXLeftForEyeSize * 0.6 && x < lengthXLeftForEyeSize * 0.3) ||
    (x > lengthXRightForEyeSize * 0.3 && x < lengthXRightForEyeSize * 0.6) ||
    (y > lengthYTopForEyeSize * 0.6 && y < lengthYTopForEyeSize * 0.3) ||
    (y > lengthYBottomForEyeSize * 0.3 && y < lengthYBottomForEyeSize * 0.6)
  ) {
    return true;
  } else {
    return false;
  }
}

function isEyeSize3(x, y) {
  if ((x > lengthXLeftForEyeSize * 0.3 && x < lengthXRightForEyeSize * 0.3) && (y > lengthYTopForEyeSize * 0.3 && y < lengthYBottomForEyeSize * 0.3)) {
    return true;
  } else {
    return false;
  }
}

allDataForCoords();