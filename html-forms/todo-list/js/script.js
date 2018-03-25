'use strict';

const input = Array.from(document.querySelectorAll('.list-block input'));
const listblock = document.querySelector('.list-block');
const output = document.querySelector('output');
let num = 0;

console.log(input);
document.addEventListener('DOMContentLoaded', clear);

function clear() {
  input.forEach(tab => {
    el.checked = false;
    output.value = `${num} из ${input.length}`;
  })
}

function status() {
  if (this.checked === true) {
    num += 1;
  } else if (this.checked === false){
    num -= 1;
  };

  output.value = `${num} из ${input.length}`;
}

function state() {
  listblock.classList.remove('complete');
  if (input.every( button => button.checked === true)) {
    listblock.classList.add('complete');
  }
}

input.forEach(button => {
  button.addEventListener('click', status);
  button.addEventListener('click', state);
})

