'use strict';
const prev = document.querySelector('main nav.slider-nav a[data-action="prev"]');
const next = document.querySelector('main nav.slider-nav a[data-action="next"]');
const first = document.querySelector('main nav.slider-nav a[data-action="first"]');
const last = document.querySelector('main nav.slider-nav a[data-action="last"]');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('ul.slides').firstElementChild.classList.add('slide-current');
  checked();
})

next.addEventListener('click', nextFnc);
prev.addEventListener('click', prevFnc);
first.addEventListener('click', firstFnc);
last.addEventListener('click', lastFnc);

function nextFnc() {
  prev.classList.remove('disabled');
  first.classList.remove('disabled');

  if (next.classList.contains('disabled')) {
    return;
  }

  test('nextElementSibling', next, last);
}

function prevFnc() {
  next.classList.remove('disabled');
  last.classList.remove('disabled');

  if (prev.classList.contains('disabled')) {
    return;
  }

  test('previousElementSibling', prev, first);
}

function test(typeElementSibling, internalButton, externalButton) {
  const bttn = document.querySelector('ul.slides li.slide-current');
  let newBttn;
  if (bttn.classList.contains('slide-current')) {
    bttn.classList.remove('slide-current');
    newBttn = bttn[typeElementSibling];
    newBttn.classList.add('slide-current');
    internalButton.classList.add('disabled');
    if (newBttn[typeElementSibling] === null) {
      internalButton.classList.add('disabled');
      externalButton.classList.add('disabled');
    } else {
      internalButton.classList.remove('disabled');
      externalButton.classList.remove('disabled');
    }
  }
}

function firstFnc() {
  first.classList.add('disabled');
  prev.classList.add('disabled');
  last.classList.remove('disabled');
  next.classList.remove('disabled');

  delSlideCurrClass();
  const bttn = document.querySelector('ul.slides').firstElementChild;
  bttn.classList.add('slide-current');
}

function lastFnc() {
  first.classList.remove('disabled');
  prev.classList.remove('disabled');
  last.classList.add('disabled');
  next.classList.add('disabled');

  delSlideCurrClass();
  const bttn = document.querySelector('ul.slides').lastElementChild;
  bttn.classList.add('slide-current');
}

function delSlideCurrClass() {
  const elements = document.querySelectorAll('ul.slides li.slide-current');

  if (elements === null) {
    return;
  }
  elements.forEach(element => {
    element.classList.remove('slide-current');
  });
}

function checked() {
  const currentBttn = document.querySelector('.slide-current');

  if (currentBttn.previousElementSibling === null) {
    prev.classList.add('disabled');
    first.classList.add('disabled');
  } else {
    prev.classList.remove('disabled');
    first.classList.remove('disabled');
  }

  if (currentBttn.nextElementSibling === null) {
    last.classList.add('disabled');
    next.classList.add('disabled');
  } else {
    last.classList.remove('disabled');
    next.classList.remove('disabled');
  }
}
