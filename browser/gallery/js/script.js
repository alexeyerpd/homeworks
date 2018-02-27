'use strict';
const img = document.getElementById('currentPhoto');
const next = document.getElementById('nextPhoto');
const back = document.getElementById('prevPhoto');

const array = [ './i/breuer-building.jpg',
  './i/guggenheim-museum.jpg',
  './i/headquarters.jpg',
  './i/IAC.jpg',
  './i/new-museum.jpg'
];

let step = 0;
function nextPhoto() {
  step++;
  if ( step > 4 ) {
    step = 0;
    img.src = array[step];
  } else {
    img.src = array[step];
  }
}

function prevPhoto() {
  step--;
  if ( step < 0 ) {
    step = 4;
    img.src = array[step];
  } else {
    img.src = array[step];
  }
}

next.onclick = nextPhoto;
back.onclick = prevPhoto;