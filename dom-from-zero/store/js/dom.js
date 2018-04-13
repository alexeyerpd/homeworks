'use strict';

function createElement(node) {
  console.log(node)
  if (typeof node === 'string' || typeof  node === 'number' || node === true) {
    return document.createTextNode(node)
  }

  if (node === undefined || node === null || node === false) {
    return document.createTextNode('')
  }

  if (Array.isArray(node)) {
    return node.reduce((f, elem, i) => {

      // console.log(f, i)
      f.appendChild(createElement(elem))
      return f;
    }, document.createDocumentFragment())
  }


  const element = document.createElement(node.name);

  if (node.props) {

    [].concat(node.props.class.split(' ')).filter(Boolean).forEach(className => {
      element.classList.add(className)
    });

  }

  element.appendChild(createElement(node.childs))
  console.log(element)
  return element;
}
