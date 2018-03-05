'use strict';

const music = [
	{ link: 'mp3/LA Chill Tour.mp3', title: 'LA Chill Tour'},
	{ link: 'mp3/LA Fusion Jam.mp3', title: 'LA Fusion Jam'},
	{ link: 'mp3/This is it band.mp3', title: 'This is it band'}
];
const btnPlay = document.getElementsByClassName('playstate')[0];
const btnStop = document.getElementsByClassName('stop')[0];
const btnBack = document.getElementsByClassName('back')[0];
const btnNext = document.getElementsByClassName('next')[0];
const btnAudio = document.getElementsByTagName('audio')[0];
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const faPause = document.getElementsByClassName('fa-pause')[0];
const faPlay = document.getElementsByClassName('fa-play')[0];
const musicName = document.getElementsByClassName('title')[0];


btnAudio.src = music[0].link;
let timeoutID, stepMusic = 0;

function endMusic() {
	btnPlay.classList.remove('play');
	btnPlay.classList.add('pause');
	mediaplayer.classList.remove('play');
	faPause.style.display = 'none';
	faPlay.style.display = 'inline-block';
	btnAudio.pause();
}

function playstate() {
  if (!btnPlay.classList.contains('play')) {
  	btnPlay.classList.remove('pause');
  	btnPlay.classList.add('play');
  	mediaplayer.classList.add('play');
  	
  	faPause.style.display = 'inline-block';
		faPlay.style.display = 'none';
		btnAudio.play();
  } else if (btnPlay.classList.contains('play')) {
  	btnPlay.classList.remove('play');
  	btnPlay.classList.add('pause');
  	mediaplayer.classList.remove('play');
  	
  	faPause.style.display = 'none';
		faPlay.style.display = 'inline-block';
		btnAudio.pause();
  }

  let intermediateTime = (btnAudio.duration - btnAudio.currentTime) * 1000;
  if (btnPlay.classList.contains('pause'))	{
  	window.clearTimeout(timeoutID);
  }

  if (btnPlay.classList.contains('play')) {
	  timeoutID  = setTimeout(function() {
	  	endMusic();
	  }, intermediateTime);
	}
}

btnPlay.onclick = playstate;

function stop() {
	endMusic();
	btnAudio.currentTime = 0;
}

btnStop.onclick = stop;

function next() {
	endMusic();
	
	stepMusic++;
	if (stepMusic > music.length - 1) {
		stepMusic = 0;
		btnAudio.src = music[stepMusic].link
	} else {
		btnAudio.src = music[stepMusic].link
	}
	musicName.title = music[stepMusic].title;
}

function back() {
	endMusic();
	
	stepMusic--;
	if (stepMusic < 0) {
		stepMusic = music.length - 1;
		btnAudio.src = music[stepMusic].link
	} else {
		btnAudio.src = music[stepMusic].link
	}
	musicName.title = music[stepMusic].title;
}

btnBack.onclick = back;
btnNext.onclick = next;