'use strict';

loadData('https://neto-api.herokuapp.com/food/42')
  .then(getFood)
  .then(() => {
    return Promise.all([loadData('https://neto-api.herokuapp.com/food/42/rating'),loadData('https://neto-api.herokuapp.com/food/42/consumers')])
  })
  .then(([rating, consum]) => {
    getRating(rating);
    getPersonsList(consum);
  })

function randomName(min, max, countSymbol) {
  let name = '';
  for (let i = 1; i <= countSymbol; i++) {
    name += String.fromCharCode(Math.floor(Math.random()*(max - min)) + min)
  }
  return name;
}

function loadData(url) {
  const functionName = randomName(97, 122, 5);
  return new Promise((done, fail) => {
    window[functionName] = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.querySelector('body').appendChild(script);
  })
}

function getFood(data) {
  document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})` ;
  document.querySelector('[data-title]').textContent = data.title ;
  document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ') ;
}

function getRating(data) {
  document.querySelector('[data-rating]').textContent = (data.rating).toFixed(2) ;
  document.querySelector('[data-votes]').textContent = data.votes ;
  document.querySelector('[data-star]').width = `${data.rating*100}%` ;
  document.querySelector('[data-star]').setAttribute('width', `${data.rating * 10}%`)
}

function getPersonsList(data) {
  data.consumers.forEach(person => {
    document.querySelector('[data-consumers]').innerHTML += `<img src="${person.pic}" title="${person.name}">`
  });
  document.querySelector('[data-consumers]').innerHTML += `<span>(${data.total - document.querySelector('[data-consumers]').childNodes.length})</span>`;
}