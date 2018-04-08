'use strict';
//Подскажите, эту задачу можно было реальизовать только через 'https://neto-api.herokuapp.com/twitter/jsonp', или все-таки как-то можно было через 'https://neto-api.herokuapp.com/twitter/json'?
loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(getData);

function loadData(url) {
  const functionName = randomName(97, 122, 5);
  return new Promise((done, fail) => {
    window[functionName] = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.querySelector('body').appendChild(script)
  })
}

function randomName(min, max, countSymbol) {
  let name = '';
  for (let i = 1; i <= countSymbol; i++) {
    name += String.fromCharCode(Math.floor(Math.random()*(max - min)) + min)
  }
  return name;
}

function getData(data) {
  document.querySelector('[data-wallpaper]').src = data.wallpaper;
  document.querySelector('[data-username]').textContent = data.username;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-tweets]').textContent = data.tweets;
  document.querySelector('[data-followers]').textContent = data.followers;
  document.querySelector('[data-following]').textContent = data.following;
}