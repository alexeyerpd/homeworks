'use strict';

const data = JSON.parse(loadContacts());
const contactList = document.querySelector('.contacts-list');

function creatorPerson() {
  return data.reduce((memory, person) => {
    const personInfo = '<li ' + 'data-email="' + person.email + '"' + 'data-phone="' + person.phone + '">' + '<strong>' + person.name + '</strong>' + '</li>';
    memory.push(personInfo);
    return memory;
  }, [])
}

contactList.innerHTML = creatorPerson().join('');