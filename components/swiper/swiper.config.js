const faker = require('faker');
// import faker from 'faker';

const count = 3;
const slidesData = [];

for(let i = 0;i < count;i++){
    let slide = {
        title: 'Slide',
        image: faker.image.animals()
    };
    slidesData.push(slide);
}

module.exports = {
    context: {
        slides: slidesData
    }
}