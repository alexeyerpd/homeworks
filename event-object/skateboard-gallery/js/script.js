'use strict';

const links = document.getElementsByTagName('a');
const viewImg = document.getElementsByClassName('gallery-view')[0];
function target(event) {
  event.preventDefault();
  Array.from(links).forEach( link => {
    link.classList.remove('gallery-current');
  })
  this.classList.add('gallery-current');
}

function srcImg(event) {
  viewImg.src = event.currentTarget;
}

Array.from(links).forEach( link => {
  link.addEventListener('click', target);
  link.addEventListener('click', srcImg);
})