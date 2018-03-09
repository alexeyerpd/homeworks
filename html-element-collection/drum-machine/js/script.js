'use strict';

const directory = Array.from(document.getElementsByClassName('drum-kit__drum'));

function play() {
  const button = this.getElementsByTagName('audio')[0];
  button.currentTime = 0;
  button.play();
}

directory.forEach((music) => {
  music.onclick = play;
});