'use strict';

console.log('Hi!');

const backvoice = document.querySelector('.contentform');
const bttnContact = document.querySelector('.contentform .button-contact');
bttnContact.addEventListener('click', bttnOn);

const output = document.querySelector('#output');
const bttnEnd = document.querySelector('main .button-contact');
bttnEnd.addEventListener('click', bttnOff);

document.addEventListener('DOMContentLoaded', onLoad)
document.querySelector('input[name="zip"]').type = 'number';

function onLoad() {
  Array.from(document.querySelectorAll('label input, label textarea')).forEach( field => {
    field.addEventListener('input', isStatus);
    field.addEventListener('click', isStatus);
    field.addEventListener('input', what);
    field.addEventListener('click', what);
  })
}

function isStatus() {
  const field = document.querySelector(`#${this.name}`);

  if (this.value !== '') {
    if (field !== null) {
      field.value = this.value;
    }
    this.classList.add('ok');
  } else {
    if (field != null) {
      field.value = '';
    }
    this.classList.remove('ok');
  }
}

function what() {
  let status = Array.from(document.querySelectorAll('label input, label textarea'))
    .every( field => field.classList.contains('ok'));
  if (status) {
    bttnContact.removeAttribute('disabled');
  } else {
    bttnContact.setAttribute('disabled', 'true');
    if (status) {
      bttnContact.removeAttribute('disabled');
    }
  }
}

function bttnOn(event) {
  event.preventDefault();
  bttnContact.disabled = false;
  output.classList.remove('hidden');
  backvoice.classList.add('hidden');
}

function bttnOff() {
  output.classList.add('hidden');
  backvoice.classList.remove('hidden');
}
