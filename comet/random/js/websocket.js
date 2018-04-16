'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const sectionWebsocket = document.querySelector('section.websocket');
let numberWebSocket;

wss.addEventListener('message', onWebsocket);
wss.addEventListener('close', (event) => {

});
wss.addEventListener('error', (error) => {
  console.error(`Произошла ошибка ${error.data}`);
});

function onWebsocket(event) {
  try {
    numberWebSocket = Number(event.data);
    if (!numberWebSocket) {
      throw `Ошибка во входящих данных`;
    }

    const div = sectionWebsocket.querySelectorAll('div');
    div.forEach((el, index) => {
      if ((index + 1) === numberWebSocket) {
        delClassWebsocket();
        el.classList.add('flip-it');
      }
    })
  } catch (err) {
    console.error(err);
  }
}

function delClassWebsocket() {
  sectionWebsocket.querySelectorAll('div').forEach(el => el.classList.remove('flip-it'));
}

