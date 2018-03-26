'use strict';

function createRow(data, i) {
  return Object
    .keys(data)
    .map(key => {
      const cell = document.createElement('td');
      cell.classList.add('prop__value');
      cell.textContent = data[key];
      cell.dataset.propName = key;
      return cell;
    })
    .reduce((row, cell) => {
      row.appendChild(cell);
      return row;
    }, document.createElement('tr'));
}

function createRows(data) {
  return data
    .map((item, step) => {
      item.tab = createRow(item);
      item.tab.classList.add(step % 2 ? 'odd' : 'even');
      return item.tab;
    })
    .reduce((fragment, row) => {
      fragment.appendChild(row);
      return fragment;
    }, document.createDocumentFragment());
}

function showRows(table, data) {
  const body = table.querySelector('tbody');
  body.innerHTML = '';
  body.appendChild(createRows(data));
}

function sortTable(prop, dir) {
  data
    .sort((a, b) => {
      return a[prop] > b[prop] ? dir : -dir;
    })
    .forEach((item, step) => {
      item.tab.style.order = step + 1;
      item.tab.classList.remove('odd');
      item.tab.classList.remove('even');
      item.tab.classList.add(step % 2 ? 'odd' : 'even');
    });
}

const data = [
  { 'firstName': 'Роберт', 'lastName': 'Паттинсон', 'birth': 1986 },
  { 'firstName': 'Михаил', 'lastName': 'Боярский', 'birth': 1949 },
  { 'firstName': 'Киану', 'lastName': 'Ривз', 'birth': 1964 },
  { 'firstName': 'Константин', 'lastName': 'Хабенский', 'birth': 1972 },
  { 'firstName': 'Владимир', 'lastName': 'Машков', 'birth': 1963 }
];

showRows(document.querySelector('table'), data);
