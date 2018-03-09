'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
const pattern = /(нетология)/i;
const pattern2 = [
  /(н)/i,
  /(не)/i,
  /(нет)/i,
  /(нето)/i,
  /(нетол)/i,
  /(нетоло)/i,
  /(нетолог)/i,
  /(нетологи)/i,
  /(нетология)/i
];
const compare = [],
intermediateArray = [];

function openMenu(event) {
  // if (!event.ctrlKey) {
  //   return;
  // }
  // if (!event.altKey) {
  //   return;
  // }
  // if (event.code === 'KeyT') {
  //   nav.classList.add('visible')
  // }
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    nav.classList.add('visible');
  }
}

function secretWord(event) {
  compare.push(event.key);
  intermediateArray.push(compare.join(''));
  intermediateArray.forEach((letter, ind) => {
    if (pattern2[ind].test(letter)) {
      if (pattern.test(letter)) {
        secret.classList.add('visible');
      }
    } else {
      compare.splice(0,);
      intermediateArray.splice(0,);
    }
  })
}

document.addEventListener('keydown', openMenu);
document.addEventListener('keydown', secretWord);

