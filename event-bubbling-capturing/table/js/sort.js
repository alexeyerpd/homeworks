'use strict';
const captions = document.querySelectorAll('thead th');

function handleTableClick(event) {

  captions.forEach(caption => {
    if (caption === event.target) {

      if (checkDir(event.target)) {
        event.target.dataset.dir = '1';
        sortTable(event.target.dataset.propName, -1);
      } else {
        event.target.dataset.dir = '-1';
        sortTable(event.target.dataset.propName, 1);
      }

      document.querySelector('thead').dataset.sortBy = event.target.dataset.propName;
      removeAtt(event.target);
    }
  });
}

function checkDir(node) {
  if (node.dataset.dir === '-1') {
    return true;
  } else {
    return false
  }
}

function removeAtt(node) {
  Array
    .from(document.querySelectorAll('thead th[data-prop-name]'))
    .filter(el => {
      return el !== node;
    })
    .forEach(el => {
      el.removeAttribute('data-dir');
      el.removeAttribute('data-sort-by');
    });
}