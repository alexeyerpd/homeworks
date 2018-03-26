'use strict';

document.querySelector('.items-list')
  .addEventListener('click', event => {
    if (Array
          .from(document.querySelectorAll('a.add-to-cart'))
          .some(good => good === event.target)) {
      const {title, price} = event.target.dataset;
      addToCart({title, price});
    }
  });
