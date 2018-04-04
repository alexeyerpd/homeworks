'use strict';
const color = document.querySelector('#colorSwatch');
const size = document.querySelector('#sizeSwatch');
const basket = document.querySelector('#quick-cart');
const basketSend = document.querySelector('#AddToCart');

let remove;

basketSend.addEventListener('click', sendBasket);

function createSizeBlock(obj) {
  size.innerHTML += ` 
    <div data-value="${obj.type}" class="swatch-element plain ${obj.type} ${isAvble(obj.isAvailable)}"> 
    <input id="${obj.type}" type="radio" name="size" value="${obj.type}" ${isChkd(obj.isAvailable)}> 
    <label for="${obj.type}"> 
    ${obj.title} 
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?109942.."> 
    </label> 
    </div> 
  `
}

function createColorBlock(obj) {
  color.innerHTML += ` 
    <div data-value="${obj.type}" class="swatch-element color ${obj.type} ${isAvble(obj.isAvailable)}"> 
    <div class="tooltip">${obj.title}</div> 
    <input quickbeam="color" id="${obj.type}" type="radio" name="color" value="${obj.type}" ${isChkd(obj.isAvailable)}> 
    <label for="${obj.type}" style="border-color: red;"> 
    <span style="background-color: ${obj.code};"></span> 
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?109942.."> 
    </label> 
    </div> 
  `
}

function createBasketBlock(obj) {
  basket.innerHTML = ` 
    <div class="quick-cart-product quick-cart-product-static" id="${obj.id}" style="opacity: 1;"> 
    <div class="quick-cart-product-wrap"> 
    <img src="${obj.pic}" title="${obj.title}"> 
    <span class="s1" style="background-color: #000; opacity: .5">$800.00</span> 
    <span class="s2"></span> 
    </div> 
    <span class="count hide fadeUp" id="${obj.id}">${obj.quantity}</span> 
    <span class="quick-cart-product-remove remove" data-id="${obj.id}"></span> 
    </div> 
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${isRes(obj)}"> 
    <span> 
    <strong class="quick-cart-text">Оформить заказ<br></strong> 
    <span id="quick-cart-price">$800.00</span> 
    </span> 
    </a> 
  `
}

function isRes(obj) {
  if (obj.quantity === 0 || typeof obj === 'undefined') {
    return "";
  } else {
    return 'open'
  }
}

function isAvble(obj) {
  if (obj) {
    return 'available';
  } else {
    return 'soldout';
  }
}

function isChkd(obj) {
  if (obj) {
    return "";
  } else {
    return "disabled";
  }
}

function statusColor(event) {
  if (event.target.checked) {
    localStorage.color = event.target.id
  }
}

function statusSize(event) {
  if (event.target.checked) {
    localStorage.size = event.target.id;
  }
}

function getColors() {
  return fetch('https://neto-api.herokuapp.com/cart/colors')
    .then(getResolve)
    .then(result => {
      color.innerHTML = '';
      result.forEach(el => {
        createColorBlock(el);
      })
    })
}

function getSize() {
  return fetch('https://neto-api.herokuapp.com/cart/sizes')
    .then(getResolve)
    .then(result => {
      size.innerHTML = '';
      result.forEach(el => {
        createSizeBlock(el);
      })
    })
}

function sendBasket(event) {
  event.preventDefault();

  const formData = new FormData(document.querySelector('#AddToCartForm'))
  formData.append('productId', `${document.querySelector('#AddToCartForm').dataset.productId}`);

  postBasket(formData)
    .then( () => {
      return Promise.all([getColors(), getSize()])
        .then(() => {
          getLastStatus();
          document.querySelector('#colorSwatch').addEventListener('change', statusColor);
          document.querySelector('#sizeSwatch').addEventListener('change', statusSize)
        })
    })
    .then(basketFnc)
}

function removeFnc(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('productId', `${event.currentTarget.dataset.id}`);

  fetch('https://neto-api.herokuapp.com/cart/remove', {
    body: formData,
    credentials: 'same-origin',
    method: 'POST',
    // headers: {}
  }).then((resolve) => {
      fetch('https://neto-api.herokuapp.com/cart')
        .then(getResolve)
        .then(res => {
          if (typeof res[0] === 'undefined') {
            // basket.innerHTML = '';
            document.querySelector('#quick-cart-pay').classList.remove('open');
          } else {
            res.forEach(el => {
              createBasketBlock(el);
              remove = document.querySelector('.remove');
              remove.addEventListener('click', removeFnc);

              const fieldCartPrice = document.querySelector('#quick-cart-price');
              fieldCartPrice.textContent = `${getFinalPrice(el)}$`;
            })
          }
        })
    })
}

function getFinalPrice(obj) {
  return Number(obj.price) * Number(obj.quantity);
}

function basketFnc() {
  return fetch('https://neto-api.herokuapp.com/cart')
    .then(getResolve)
    .then( (res) => {
      res.forEach(el => {
        createBasketBlock(el);
        remove = document.querySelector('.remove');
        remove.addEventListener('click', removeFnc);

        const fieldCartPrice = document.querySelector('#quick-cart-price');
        fieldCartPrice.textContent = `${getFinalPrice(el)}$`;
      })
    })
}

function postBasket(data) {
  return  fetch('https://neto-api.herokuapp.com/cart', {
      body: data,
      credentials: "same-origin",
      method: 'POST',
      // headers: {},
  })
}

function onStart() {
  Promise.all([getColors(), getSize()])
    .then( () => {
      getLastStatus();
      document.querySelector('#colorSwatch').addEventListener('change', statusColor);
      document.querySelector('#sizeSwatch').addEventListener('change', statusSize);
    })
}

function getLastStatus() {
  let size = document.querySelector(`#${localStorage.size}`);
  let color = document.querySelector(`#${localStorage.color}`);

  size = size !== null ? size.setAttribute('checked', 'true'): '';
  color = color !== null ? color.setAttribute('checked', 'true'): '';

}

function getResolve(resolve) {
  return resolve.json();
}

onStart();



