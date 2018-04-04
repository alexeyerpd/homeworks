'use strict';

const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const reset = document.querySelector('#reset');

increment.addEventListener('click', incr);
decrement.addEventListener('click', decr);
reset.addEventListener('click', res);

localStorage.value = !isNaN(localStorage.value) ? localStorage.value: 0;
counter.textContent = localStorage.value;

function incr(event) {
  counter.textContent = ++localStorage.value;
}

function decr(event) {
  if (Number(localStorage.value) > 0) {
    counter.textContent = --localStorage.value;
  }
}

function res(event) {
  localStorage.value = 0;
  counter.textContent = localStorage.value;
}

