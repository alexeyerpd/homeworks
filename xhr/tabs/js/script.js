'use strict';

const emailTab = document.querySelectorAll('.tabs nav a')[0];
const smsTab = document.querySelectorAll('.tabs nav a')[1];
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');

let emailHTML, smsHTML;

const xhrEmail = new XMLHttpRequest();
const xhrSms = new XMLHttpRequest();
xhrEmail.addEventListener('load', onLoadEmail);
xhrSms.addEventListener('load', onLoadSms);
xhrEmail.addEventListener('loadstart', onLoadStart);
xhrEmail.addEventListener('loadend', onLoadEnd)

emailTab.addEventListener('click', act);
smsTab.addEventListener('click', act);

xhrEmail.open(
  'GET',
  `https://raw.githubusercontent.com/alexeyerpd/homeworks/master/xhr/tabs/components/email-tab.html`,
  true
);

xhrSms.open(
  'GET',
  `https://raw.githubusercontent.com/alexeyerpd/homeworks/master/xhr/tabs/components/sms-tab.html`,
  true
);

xhrEmail.send();

function onLoadEmail() {
  emailHTML = xhrEmail.responseText;
  content.innerHTML = emailHTML;
}

function onLoadSms() {
  smsHTML = xhrSms.responseText;
  content.innerHTML = smsHTML;
}

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoadEnd() {
  preloader.classList.add('hidden');
}

function currentXML(type) {
  if (type === 'Email') {
    xhrEmail.open(
      'GET',
      `https://raw.githubusercontent.com/alexeyerpd/homeworks/master/xhr/tabs/components/email-tab.html`,
      true
    );
    xhrEmail.send();
  } else if (type === 'SMS') {
    xhrSms.open(
      'GET',
      `https://raw.githubusercontent.com/alexeyerpd/homeworks/master/xhr/tabs/components/sms-tab.html`,
      true
    );
    xhrSms.send();
  }
}

function del(tab) {
  if (tab === 'Email') {
    Array.from(document.querySelectorAll('a.active')).forEach(status => {
      status.classList.remove('active');
    });
  } else if (tab === "SMS") {
    Array.from(document.querySelectorAll('a.active')).forEach(status => {
      status.classList.remove('active');
    });
  }
}

function act(event) {
  event.preventDefault();
  if (this.innerHTML === 'Email') {
    currentXML('Email');
    del('Email');
    this.classList.add('active');
  } else if (this.innerHTML === "SMS") {
    currentXML('SMS');
    del('SMS')
    this.classList.add('active');
  }
}



