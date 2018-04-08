'use strict';

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(getProfile)
  .then((data) => {
    return loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
  })
  .then(getTechnologies);

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

function getProfile(data) {
  document.querySelector('[data-name]').textContent = data.name;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-position]').textContent = data.position;
  document.querySelector('[data-technologies]').textContent = data.technologies;
  return data;
}

function getTechnologies(data) {
  data.forEach(techno => {
    document.querySelector('[data-technologies]').innerHTML += `<span class="devicons devicons-${techno}"></span>`;
  });
  document.querySelector('.content').style.display = 'initial';
}