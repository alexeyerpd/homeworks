'use strict';

let directory = Array.from(document.getElementsByClassName('drum-kit__drum'));

function play() {
  this.getElementsByTagName('audio')[0].play();
}

directory.forEach((music) => {
  music.onclick = play;
});