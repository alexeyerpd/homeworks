'use strict';

function handleTableClick(event) {

  switch(event.target) {
    case document.querySelector('thead th[data-prop-name="firstName"]') :
      checkDir(event.target);
      removeAtt(event.target);
      break;

    case document.querySelector('thead th[data-prop-name="lastName"]') :
      checkDir(event.target);
      removeAtt(event.target);
      break;

    case document.querySelector('thead th[data-prop-name="birth"]') :
      checkDir(event.target);
      removeAtt(event.target);
      break;
  }
}

function checkDir(node) {
  if (node.dataset.dir === '-1') {
    node.dataset.dir = '1';
    sortTable(node.dataset.propName, -1);
  } else {
    node.dataset.dir = '-1';
    sortTable(node.dataset.propName, 1);
  }
  document.querySelector('thead').dataset.sortBy = node.dataset.propName;
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