'use strict';

const faker = require('faker');
const memberCount = 10;
const memberData = [];

for (var i = 0; i < memberCount; i++) {
    memberData.push({
        avatar: faker.image.avatar(),
        name: faker.name.findName(),
        email: faker.internet.email()
    });
}

const fakerImage = faker.image.image();
const fakerAnimal = faker.image.animals();
module.exports = {
	context: {
		members: memberData,
    text: 'Heading',
    image: {
      url: '/assets/images/dakota-lim-EjubMjIWbWA-unsplash.jpg',
      alt: 'alt texten'
    },
    fakeImage_1: fakerImage,
    fakeImage_2: fakerAnimal,
	}
};

/*
image
  image
  avatar
  imageUrl
  abstract
  animals
  business
  cats
  city
  food
  nightlife
  fashion
  people
  nature
  sports
  technics
  transport
  dataUri
  lorempixel
  unsplash
  lorempicsum
*/
