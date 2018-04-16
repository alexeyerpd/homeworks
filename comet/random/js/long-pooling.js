'use strict';

const sectionLongPooling = document.querySelector('section.long-pooling');
let numberLongPooling;

function passLongPooling() {
  return fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then(response)
    .then(text => {
      numberLongPooling = Number(text.trim());
      onLongPooling(numberLongPooling)
    })
    .catch(message => {
      console.error(message)
    })
}

function response(data) {
  if (data.status >= 200 && data.status < 300) {
    return data.text()
  } else {
    return new Error(`Ошибка подключения: ${data.status}`)
  }
}

function onLongPooling(incmgIndex) {
  try {
    if (typeof incmgIndex !== 'number') {
      throw 'Тип данных не является числом'
    }

    const div = sectionLongPooling.querySelectorAll('div');
    div.forEach((el, index) => {
      if ((index + 1) === incmgIndex) {
        delClassLongPooling();
        el.classList.add('flip-it')
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function delClassLongPooling() {
  sectionLongPooling.querySelectorAll('div').forEach(el => el.classList.remove('flip-it'))
}

setInterval(passLongPooling, 30000);