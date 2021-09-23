'use strict';

const faker = require('faker');
const counter = 10;
const data = [];

for (var i = 0; i < counter; i++) {
    data.push({
        title: faker.lorem.words(),
        body: faker.lorem.sentences(),
    });
}

module.exports = {
	context: {
		accordionData: data,
	}
};