'use strict';

const connect = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter = document.querySelector('.counter');
const error = document.querySelector('output.errors');
let data;

connect.addEventListener('close', (e) => {
  connect.close(1000, 'закрылись')
});
connect.addEventListener('message', refrash);

function refrash(event) {
  data = JSON.parse(event.data);
  refrashConnections(event);
  refrashErrors(event);
}

function refrashConnections(event) {
  counter.textContent = data.connections;
}

function refrashErrors(event) {
  error.textContent = data.errors;
}