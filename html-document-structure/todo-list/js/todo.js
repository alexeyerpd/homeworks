'use strict';
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');

const lists = document.querySelectorAll('input');
lists.forEach(list => {
  list.addEventListener('focus', status);
});

function status(event) {
  const list = event.target;
  if (list.checked) {
    undone.appendChild(list.parentElement)
  } else {
    done.appendChild(list.parentElement)
  }
}