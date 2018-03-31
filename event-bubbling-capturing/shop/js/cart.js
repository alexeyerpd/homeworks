'use strict';

document.querySelector('.items-list')
  .addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const {title, price} = event.target.dataset;
      addToCart({title, price});
    }
  });
