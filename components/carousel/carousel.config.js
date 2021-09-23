'use strict';

const faker = require('faker');
const cardCount = 10;
const cardData = [];

for (var i = 0; i < cardCount; i++) {
    cardData.push({
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
		cards: cardData,
	}
};