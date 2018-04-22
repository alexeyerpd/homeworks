'use strict';

const acSelect = document.querySelector('#acSelect');
const scheme = document.querySelector('#btnSeatMap');
const allClose = document.querySelector('#btnSetFull');
const allOpen = document.querySelector('#btnSetEmpty');
const title = document.querySelector('#seatMapTitle'); // формат Airbus A320 (186 пассажиров)
const schemePlaces = document.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');
let i = 0;

schemePlaces.addEventListener('click', hasOccupation, false );
scheme.addEventListener('click', act);
allClose.setAttribute('disabled', true);
allClose.addEventListener('click', onAllClose);
allOpen.setAttribute('disabled', true);
allOpen.addEventListener('click', onAllOpen);

function onAllOpen(event) {
  event.preventDefault();
  schemePlaces.querySelectorAll('.col-xs-4').forEach(place => {
    place.classList.remove('adult');
    place.classList.remove('half');
  });
  placesCountCheck();
}

function onAllClose(event) {
  event.preventDefault();

  schemePlaces.querySelectorAll('.col-xs-4').forEach(place => {
    if (place.classList.contains('adult') || place.classList.contains('half')) {
      place.classList.remove('adult');
      place.classList.remove('half')
    }
    place.classList.add('adult')

  });
  placesCountCheck()
}

function hasOccupation(event) {
  if (event.target.classList.contains('seat-label') && event.button === 0 && !event.altKey) {
    event.target.parentElement.classList.remove('half');
    event.target.parentElement.classList.toggle('adult');
  }

  if (event.target.classList.contains('seat-label') && event.button === 0 && event.altKey) {
    event.target.parentElement.classList.remove('adult');
    event.target.parentElement.classList.toggle('half');
  }

  placesCountCheck()

}



function response(text) {
  return text.json();
}

function act(event) {
  if (event) {event.preventDefault()};
  allClose.removeAttribute('disabled');
  allOpen.removeAttribute('disabled');

  i = 0;
  schemePlaces.textContent = '';

  fetch(`https://neto-api.herokuapp.com/plane/${acSelect.value}`)
    .then(response)
    .then((data) => {
      show(data.scheme);

      title.textContent = `${data.title} (${data.passengers} пассажиров)`;
      placesCountCheck();
    })
}

function placesCountCheck() {
  totalPax.textContent = document.querySelectorAll('.adult').length + document.querySelectorAll('.half').length;
  totalAdult.textContent = document.querySelectorAll('.adult').length;
  totalHalf.textContent = document.querySelectorAll('.half').length;
}

function show(list) {
  schemePlaces.appendChild(renderingBrowserEngine(list.map(el => {
    return create(el);
  })))
}

function create(place) {
  if (place === 0) {
    return {
      tag: 'div',
      cls: [
        'row', 'seating-row', 'text-center'
      ],
      content: [
        {
          tag: 'div',
          cls: ['col-xs-1', 'row-number'],
          content: [
            {
              tag: 'h2',
              content: ++i
            }
          ]
        },
        {
          tag: 'div',
          cls: ['col-xs-4', 'no-seat']
        }
      ]
    }
  } else if (place === 6) {
    return {
      tag: 'div',
      cls: [
        'row', 'seating-row', 'text-center'
      ],
      content: [
        {
          tag: 'div',
          cls: ['col-xs-1', 'row-number'],
          content: [
            {
              tag: 'h2',
              content: ++i
            }
          ]
        },
        {
          tag: 'div',
          cls: 'col-xs-5',
          content: [
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'A'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'B'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'C'
                }
              ]
            }
          ]
        },
        {
          tag: 'div',
          cls: 'col-xs-5',
          content: [
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'D'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'E'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'F'
                }
              ]
            }
          ]
        }
      ]
    }
  } else if (place === 4) {
    return {
      tag: 'div',
      cls: [
        'row', 'seating-row', 'text-center'
      ],
      content: [
        {
          tag: 'div',
          cls: ['col-xs-1', 'row-number'],
          content: [
            {
              tag: 'h2',
              content: ++i
            }
          ]
        },
        {
          tag: 'div',
          cls: 'col-xs-5',
          content: [
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'B'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'C'
                }
              ]
            }
          ]
        },
        {
          tag: 'div',
          cls: 'col-xs-5',
          content: [
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'D'
                }
              ]
            },
            {
              tag: 'div',
              cls: ['col-xs-4', 'seat'],
              content: [
                {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'E'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

function renderingBrowserEngine(block) {
  if ((typeof block === 'string') || (typeof block === 'number' ) || (block === true)) {
    return document.createTextNode(block);
  }

  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }

  if (Array.isArray(block)) {

    return block.reduce((f, elem) => {

      f.appendChild(renderingBrowserEngine(elem))
      return f;
    }, document.createDocumentFragment())
  }

  const element = document.createElement(block.tag);

  [].concat(block.cls).filter(Boolean).forEach(className => element.classList.add(className));

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {

      element.setAttribute(key, block.attrs[key]);
    })
  }

  element.appendChild(renderingBrowserEngine(block.content))
  return element;
}