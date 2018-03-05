'use strict';
let wrapDrop = document.getElementsByClassName('wrapper-dropdown')[0];
function statusDropdown() {
  if (!this.classList.contains('active')) {
    this.classList.add('active');
  } else {
    this.classList.remove('active');
  }
}

wrapDrop.onclick = statusDropdown;