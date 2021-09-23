class Slider {
    constructor(el) {
        this.options = { ...el.dataset };
        console.log(this.options);
        this.slides = el.getElementsByClassName(el.getAttribute('data-slides')) || el.children ;
        this.setButtonValue = el.getAttribute('data-button-value') || false;
        this.prevButton = el.getAttribute('data-arrows') ? this.createElement('button', 'arrow-prev', 'prev') : false ;
        this.nextButton = el.getAttribute('data-arrows') ? this.createElement('button', 'arrow-next', 'next') : false ;
        this.prevButton ? el.appendChild(this.prevButton) : '';
        this.nextButton ? el.appendChild(this.nextButton) : '';
        this.slides = el.getElementsByClassName(el.getAttribute('data-slides'));
        this.slidesClassName = el.getAttribute('data-slides');
        this.direction = el.getAttribute('data-data-direction') || 'horizontal';


        if( el.getAttribute('data-bullets') ){
            this.bulletContainer = this.createElement('div', 'slider-bullets');
            this.bullets = [];
            for(let i = 0;i < this.slides.length;i++){
                let btn = this.createElement('button','slider-bullets__bullet', i+1);
                btn.setAttribute('data-index', i);
                this.bullets = [...this.bullets, btn];
                this.bulletContainer.appendChild(btn);
            }
        }
        el.appendChild(this.bulletContainer);

        this.activeIndex = 0;
        this.el = el;
        this.init();
        this.addEvents();

    }

    createElement(type, className, value = false){
        const el = document.createElement(type);
        if(value && this.setButtonValue) {
            el.append( document.createTextNode(value) );
        }
        el.classList.add(className);
        return el;
    }

    init(){
        this.slides[this.activeIndex].classList.add(`${this.slidesClassName}--active`);
    }

    addEvents(){
        this.prevButton.addEventListener('click', () => {
            this.slidePrev();
        })
        this.nextButton.addEventListener('click', () => {
            this.slideNext();
        })
        this.bullets.forEach(el => {
            el.addEventListener('click', () => {
                this.bulletClick(el);
            })
        })
    }

    toggleActiveSlide(){
        for(let i = 0;i < this.slides.length;i++){
            this.slides[i].classList.remove(
            `${this.slidesClassName}--prev`,
            `${this.slidesClassName}--active`,
            `${this.slidesClassName}--next`,
            );
        }

        this.bullets.forEach(el => {
            if(parseInt(el.dataset.index) === this.activeIndex){
                el.classList.add(`slider-bullets__bullet--active`);
            } else {
                el.classList.remove(`slider-bullets__bullet--active`);
            }
        })
        
        let prevIndex = this.activeIndex <= 0 ? (this.slides.length - 1) : this.activeIndex - 1 ;
        let nextIndex = this.activeIndex >= (this.slides.length-1) ? 0 : this.activeIndex + 1 ;
        this.slides[prevIndex].classList.add(`${this.slidesClassName}--prev`);
        this.slides[nextIndex].classList.add(`${this.slidesClassName}--next`);
        this.slides[this.activeIndex].classList.add(`${this.slidesClassName}--active`);
    }

    bulletClick(element){
        this.activeIndex = parseInt( element.getAttribute('data-index') );
        this.toggleActiveSlide();
    }

    slidePrev(){
        if(this.activeIndex <= 0) {
            this.activeIndex = this.slides.length-1;
        } else {
            this.activeIndex--;
        }
        this.toggleActiveSlide();
    }

    slideNext(){
        if(this.activeIndex >= this.slides.length-1) {
            this.activeIndex = 0;
        } else {
            this.activeIndex++;
        }
        this.toggleActiveSlide();
    }
}

export default Slider;