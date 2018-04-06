'use strinct';
const cnct = new WebSocket('wss://neto-api.herokuapp.com/mouse');

cnct.addEventListener('open', onLoad);
document.addEventListener('click', action);

function action(event) {
  const obj = {};
  obj.x = event.clientX;
  obj.y = event.clientY;
  cnct.send(JSON.stringify(obj))
}

function onLoad(event) {
  showBubbles(event.currentTarget)
}