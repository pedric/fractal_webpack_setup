'use strict';

const faker = require('faker');
const slideCount = 10;
const slideData = [];

for (var i = 0; i < slideCount; i++) {
    slideData.push({
        image: {
            url: faker.image.image(),
            alt: 'alt text'
        },
        title: faker.lorem.words(),
        body: faker.lorem.sentences(),
    });
}

module.exports = {
	context: {
		slides: slideData,
	}
};