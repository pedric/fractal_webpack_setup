console.log('main.js loaded');

const moduleElements = document.querySelectorAll('[data-module]');

for (element of moduleElements) {
    const name = element.getAttribute('data-module');
    const Module = require(`./modules/${name}`).default;
    new Module(element);
}