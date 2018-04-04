'use strict';
const enterForm = document.querySelector('.sign-in-htm');
const enterFormError = document.querySelector('.sign-in-htm .error-message');
const registrForm = document.querySelector('.sign-up-htm');
const registrFormError = document.querySelector('.sign-up-htm .error-message');

const sumbitEnterForm = enterForm.querySelector('input.button');
const submitRegistrForm = registrForm.querySelector('input.button');

sumbitEnterForm.addEventListener('click', entrFrm);
submitRegistrForm.addEventListener('click', regFrm);

const xhr = new XMLHttpRequest();

let registrFormData;
let enterFormData;

function entrFrm(event) {
  event.preventDefault();

  enterFormData = new FormData(enterForm)
  let obj = {};
  for (const [key, value] of enterFormData) {
    obj[key] = value;
  }

  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(obj))
  xhr.addEventListener('load', loadInp);
}

function loadInp(event) {
  const res = JSON.parse(xhr.responseText)
  console.log(res)
  if (res.error) {
    enterFormError.textContent = res.message;
  } else {
    enterFormError.textContent = `Пользователь ${res.name} успешно авторизован`;
  }
}

function regFrm(event) {
  event.preventDefault()
  registrFormData = new FormData(registrForm)

  let obj = {}
  for (const [key, value] of registrFormData) {
    obj[key] = value;
  }

  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(obj));
  xhr.addEventListener('load', loadReg);
}

function loadReg(event) {
  const res = JSON.parse(xhr.responseText);

  if (res.error) {
    registrFormError.textContent = res.message;
  } else {
    registrFormError.textContent = `Пользователь ${res.name} успешно зарегистрирован`;
  }
}




