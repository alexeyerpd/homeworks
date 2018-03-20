'use strict';
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');
const tabs = document.querySelectorAll('.tabs nav a');

document.addEventListener('DOMContentLoaded', getStartPage);
tabs.forEach(tab => tab.addEventListener('click', getPage));

function getStartPage() {
  const firstTab = document.querySelector('.tabs nav a.active');
  xhrOn(firstTab);
}

function getPage(event) {
  event.preventDefault();
  const tab = event.target;

  if (tab.classList.contains('active')) {
    return;
  } else {
    delActiveClass();
    tab.classList.add('active');
    xhrOn(tab);
  }
}

function delActiveClass() {
  tabs.forEach(tab => {
    tab.classList.remove('active');
  })
}

function xhrOn(button) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `${button.href}`
  );
  xhr.addEventListener('load', pasteContentTab);
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.send();

  function pasteContentTab() {
    const result = xhr.responseText
    content.innerHTML = `${result}`;
  }
}

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoadEnd() {
  preloader.classList.add('hidden');
}
