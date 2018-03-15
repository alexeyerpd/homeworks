'use strict';

const content = document.querySelector('#content'),
      card = document.querySelector('#card');

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);

xhr.open(
  'GET',
  `https://neto-api.herokuapp.com/book/`,
  true
);

xhr.send();

function onLoad() {
  let bucksData = JSON.parse(xhr.responseText);
  // bucksData.forEach( buck => {
  //   console.log(content)
  //   content.innerHTML += `<li
  //                             data-title= "${buck.title}"
  //                             data-author= "${buck.author.name}"
  //                             data-info= "${buck.info}"
  //                             data-price= "${buck.price}">
  //                           <img src="${buck.cover.large}">
  //                         </li>`;
  // })
  bucksData.forEach((buck, ind) => {

    const allItem = document.querySelectorAll('#content li');
    const hasBuck = Array.from(allItem).find(item => {
      return item.dataset.title === buck.title
    })
    if (typeof hasBuck !== 'undefined') { return; }

    content.innerHTML += `<li></li>`;

    const thisItem = document.querySelectorAll('#content li')[ind +1];

    thisItem.dataset.title = buck.title;
    thisItem.dataset.author = buck.author.name;
    thisItem.dataset.info = buck.info;
    thisItem.dataset.price = buck.price;
    thisItem.innerHTML = `<img src="${buck.cover.large}">`;
  });
}


