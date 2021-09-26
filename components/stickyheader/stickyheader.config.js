'use strict';

const faker = require('faker');
const counter = 4;
const nav = [];
const logo = '/assets/images/vercel.svg';

for (var i = 0; i < counter; i++) {
    nav.push(faker.lorem.words());
}

module.exports = {
	context: {
		logo: logo,
    nav: nav,
	}
};