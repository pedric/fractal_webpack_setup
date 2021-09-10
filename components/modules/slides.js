// import Swiper from '../../node_modules/swiper/dist/js/swiper.min';
import Swiper from 'swiper/dist/js/swiper.min';
import faker from 'faker';


class Slides {
    constructor(el){
        this.animal = faker.image.animals();
        this.init();
    }

    init(){
        console.log('hej');
    }
}

export default Slides;