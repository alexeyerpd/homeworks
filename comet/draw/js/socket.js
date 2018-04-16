'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/draw');
editor.addEventListener('update', transmit);

function transmit(event) {
  event.canvas.toBlob((blob) => wss.send(blob));
}

