'use strict';

const loader = document.querySelector('#loader');
const output = document.querySelector('#result');
const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const content = document.querySelector('#content');
const input = document.querySelector('#source');

let data, i = 0;

const xhr = new XMLHttpRequest();
xhr.addEventListener('loadstart', loaderOn);
xhr.addEventListener('loadend', loaderOff);
xhr.addEventListener('load', loadOn);

xhr.open(
  'GET',
  'https://neto-api.herokuapp.com/currency'
);

xhr.send();

function loaderOn() {
  loader.classList.remove('hidden');
}

function loaderOff() {
  loader.classList.add('hidden');
}

function loadOn() {
  content.classList.remove('hidden');
  data = JSON.parse(xhr.responseText);

  data.forEach((currency, ind) => {
    create(currency, selectFrom, ind, 'from');
    create(currency, selectTo, ind, 'to');
  });

  input.addEventListener('blur', converter);
  selectFrom.addEventListener('input', converter);
  selectTo.addEventListener('input', converter);

}

function create(obj, field, index, path) {
  field.innerHTML += `<option></option>`;

  const option = document.querySelectorAll(`#${path} option`)[index];
  option.innerHTML = obj.code;
  option.value = obj.value;
}

function converter() {
  const result = ((input.value / selectTo.value) * selectFrom.value).toFixed(2);
  output.value = result;
}
