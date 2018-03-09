'use strict';

const piano = document.getElementsByClassName('set')[0];
const buttons = Array.from(piano.getElementsByTagName('li'));
const middle = [
  'sounds/middle/first.mp3',
  'sounds/middle/second.mp3',
  'sounds/middle/third.mp3',
  'sounds/middle/fourth.mp3',
  'sounds/middle/fifth.mp3'
];
const higher = [
  'sounds/higher/first.mp3',
  'sounds/higher/second.mp3',
  'sounds/higher/third.mp3',
  'sounds/higher/fourth.mp3',
  'sounds/higher/fifth.mp3'
];
const lower = [
  'sounds/lower/first.mp3',
  'sounds/lower/second.mp3',
  'sounds/lower/third.mp3',
  'sounds/lower/fourth.mp3',
  'sounds/lower/fifth.mp3'
];

function getTagsAudio() {
  const audio = buttons.map(button => {
    return button.getElementsByTagName('audio')[0];
  })
  return audio;
}

function keydown(event) {
  if (event.repeat) {
    return;
  }
  switch (event.code) {
    case 'AltLeft':
      getTagsAudio().forEach((button, ind) => {
        button.src = higher[ind];
      });
      piano.classList.remove('middle');
      piano.classList.add('higher');
    break;
    case 'ShiftLeft':
      getTagsAudio().forEach((button, ind) => {
        button.src = lower[ind];
      });
      piano.classList.remove('middle');
      piano.classList.add('lower');
    break;
  }
}

function keysup(event) {
  switch (event.code) {
    case 'AltLeft':
      getTagsAudio().forEach((button, ind) => {
        button.src = middle[ind];
      });
      piano.classList.remove('higher');
      piano.classList.add('middle');
      break;

    case 'ShiftLeft':
      getTagsAudio().forEach((button, ind) => {
        button.src = middle[ind];
      });
      piano.classList.remove('lower');
      piano.classList.add('middle');
      break;
  }
}

buttons.forEach((button, index) => {
  
  const actualAudio = button.getElementsByTagName('audio')[0];
  actualAudio.src = middle[index];

  button.addEventListener('click', () => {
    actualAudio.currentTime = 0;
    actualAudio.play();
  })
})

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keysup);


