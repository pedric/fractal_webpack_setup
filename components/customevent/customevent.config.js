'use strict';

const faker = require('faker');
const counter = 10;
const data = [];

for (var i = 0; i < counter; i++) {
    data.push({
        color: faker.commerce.color(),
        class: 'bubble',
        position: {
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
        }
    });
}

module.exports = {
	context: {
		items: data,
	}
};