'use strict';
const tabsNav = document.querySelector('.tabs-nav');
const section = document.querySelector('.tabs-content');

start();

function start() {
  const tabs = Array.from(section.children);
  const etalonTab = tabsNav.firstElementChild;
  tabs.forEach((tab, index) => {
    const newTab = etalonTab.cloneNode(true);
    newTab.firstChild.innerHTML = tab.dataset.tabTitle;
    newTab.classList.add(`${tab.dataset.tabIcon}`);
    newTab.addEventListener('click', tabActivated);

    tabsNav.appendChild(newTab);
    if (index === (tabs.length - 1)) {
      etalonTab.parentElement.removeChild(etalonTab);
    }
  });
  tabActivated();
}

function tabActivated(event) {
  const tabs = Array.from(section.children);
  const activeTab = document.querySelector('.ui-tabs-active');

  if (activeTab) {
    activeTab.classList.remove('ui-tabs-active');
  }

  const currentTab = event ?  event.currentTarget: tabsNav.firstElementChild;
  currentTab.classList.add('ui-tabs-active');

  tabs.forEach((tab) => {
    if (currentTab.classList.contains(`${tab.dataset.tabIcon}`)) {
      tab.classList.remove('hidden');
    } else {
      tab.classList.add('hidden');
    }
  });
}
