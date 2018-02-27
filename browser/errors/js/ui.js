'use strict';
function handleClick() {
  window.openMail();
}

const button = document.getElementById('open');
button.onclick = handleClick;
