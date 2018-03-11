'use strict';
const buttonAdd = document.querySelectorAll('.add');
let newAmount = document.querySelector("#cart-count");
newAmount.dataset.amount = 0;

let newPrice = document.querySelector('#cart-total-price');
newPrice.dataset.price = 0;

function add(event) {
  newAmount.dataset.amount = Number(newAmount.dataset.amount) + 1;
  newAmount.innerHTML = newAmount.dataset.amount;

  newPrice.dataset.price = Number(newPrice.dataset.price) + Number(this.dataset.price);
  newPrice.innerHTML = getPriceFormatted(newPrice.dataset.price);
}

buttonAdd.forEach( (button) => {
  button.addEventListener('click', add);
});
