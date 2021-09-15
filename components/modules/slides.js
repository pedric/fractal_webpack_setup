// import Swiper from '../../node_modules/swiper/dist/js/swiper.min';
// import Swiper from 'swiper/dist/js/swiper.min';
import Swiper from 'swiper';
import faker from 'faker';


class Slides {
    constructor(el){
        this.animal = faker.image.animals();
        this.swiper;
        this.el = el;
        this.init();
    }

    init(){
        const defaultOptions = {
            width: 200,
            loop: false,
            speed: 1000,
            freeMode: true,
            freeModeMomentumBounceRatio: 2,
            freeModeMomentumRatio: 2,
            freeModeMomentumVelocityRatio: 1,
            grabCursor: true,
            mousewheelControl: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetBefore: 15,
            mousewheel: {
                forceToAxis: true,
                invert: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                // init: function(){
                //     this.update();
                // },
            },
        };

        this.swiper = new Swiper('.swiper-container', defaultOptions);
        // document.querySelector('.swiper-button-next').addEventListener('click', () => {
        //     this.swiper.slideNext();
        // })
    }
}

export default Slides;