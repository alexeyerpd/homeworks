'use strict';

const messageInput = document.querySelector('.message-input');
const messageSubmit = document.querySelector('.message-submit');
const messageContent = document.querySelector('.messages-content');
const messageTemplates = document.querySelector('.messages-templates');
const messagePersonal = document.querySelector('.message-personal');
const messageStatus = document.querySelector('.message-status');
const chatStatus = document.querySelector('.chat-status');

messageSubmit.addEventListener('click', msgSend);

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
connection.addEventListener('open', onLoad);
connection.addEventListener('message', onMessage);
connection.addEventListener('close', onClose);


function onLoad(event) {
  chatStatus.textContent = chatStatus.dataset.online;
  messageSubmit.disabled = false;

  const message = messageStatus.cloneNode(true);
  message.querySelector('.message-text').textContent = 'Пользователь появился в сети';
  messageContent.appendChild(message);
}

function onClose(event) {
  chatStatus.textContent = chatStatus.dataset.offline;
  messageSubmit.disabled = true;

  if (messageContent.querySelector('.message-text')) {
    messageContent.querySelector('.message-text').textContent = 'Пользователь не в сети';
  } else {
    const message = messageStatus.cloneNode(true);
    message.querySelector('.message-text').textContent = 'Пользователь не в сети';
  }
}

function onMessage(event) {
  addIncmgMsg(event.data);
  messageInput.value = '';
}

function msgSend(event) {
  event.preventDefault();

  const message = messagePersonal.cloneNode(true);
  const messageText = messageInput.value;

  if (messageText !== '') {
    message.querySelector('.message-text').textContent = messageText;
    message.querySelector('.timestamp').textContent = new Date().toLocaleTimeString('ru-Ru', {hour: 'numeric', minute: 'numeric'});
    messageContent.appendChild(message);
    connection.send(JSON.stringify(messageText));
  }
}

function addIncmgMsg(data) {
  let message;

  if (data === '...') {
    message = incLoading();
  } else {
    message = incmgMsg(data);
  }

  messageContent.appendChild(message);
}

function incLoading() {
  const loadingField = messageTemplates.querySelector('.loading').cloneNode(true);
  loadingField.querySelector('span').textContent = 'Собеседник печатает сообщение';
  return loadingField;
}

function incmgMsg(data) {
  const interlocutorsMessage = Array.from(messageTemplates.querySelectorAll('.message')).find(findPersonalMsg).cloneNode(true);
  interlocutorsMessage.querySelector('.message-text').textContent = data;
  interlocutorsMessage.querySelector('.timestamp').textContent = new Date().toLocaleTimeString('ru-Ru', {hour: 'numeric', minute: 'numeric'});
  return interlocutorsMessage;
}

function findPersonalMsg(message) {
  return message.className === 'message';
}