'use strict';

const sectionPooling = document.querySelector('section.pooling');
let numberPooling;

function passPooling() {
  return fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then(response)
    .then(text => {
      numberPooling = Number(text);
      onPooling(numberPooling);
    })
    .catch(message => {
      console.error(message);
    })
}

function response(data) {
  if (data.status >= 200 && data.status < 300) {
    return data.text()
  } else {
    return new Error(`Ошибка подключения: ${data.status}`);
  }
}

function onPooling(incmgIndex) {
  try {
    if (typeof incmgIndex !== 'number') {
      throw 'Тип данных не является числом';
    }

    const div = sectionPooling.querySelectorAll('div');
    div.forEach((el, index) => {
      if ((index + 1) === incmgIndex) {
        delClassPooling();
        el.classList.add('flip-it');
      }
    })
  } catch (err) {
    console.error(err);
  }
}

function delClassPooling() {
  sectionPooling.querySelectorAll('div').forEach(el => el.classList.remove('flip-it'));
}

setInterval(passPooling, 5000);