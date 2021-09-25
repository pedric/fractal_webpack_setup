'use strict';

const faker = require('faker');
const counter = 10;
const data = [];

for (var i = 0; i < counter; i++) {
    data.push({
        color: faker.internet.color(),
        class: 'bubble',
        position: {
            x: Math.floor(Math.random() * 1000),
            y: Math.floor(Math.random() * 1000),
        }
    });
}

module.exports = {
	context: {
		items: data,
	}
};