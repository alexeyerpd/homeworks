'use strict';
let wrapDrop = document.getElementsByClassName('wrapper-dropdown')[0];
function statusDropdown() {
  this.classList.toggle('active');
}

wrapDrop.onclick = statusDropdown;