class Carousel {
    constructor(el, options = {}) {
        // options = { ...options, ...el.dataset } || {};

        this.options = { ...options, ...el.dataset } || {};
        this.wrapper = el.getElementsByClassName(this.options.wrapper)[0] || el.firstElementChild ;
        this.slides = el.getElementsByClassName(this.options.slides) || this.wrapper.children;
        this.setButtonValue = this.options.buttonValue || false;
        this.prevButton = this.options.arrows ? this.createElement('button', 'arrow-prev', 'prev') : false ;
        this.nextButton = this.options.arrows ? this.createElement('button', 'arrow-next', 'next') : false ;
        this.prevButton ? el.appendChild(this.prevButton) : null;
        this.nextButton ? el.appendChild(this.nextButton) : null;
        this.slidesClassName = this.options.slides || 'slide';
        this.direction = this.options.direction || 'horizontal';
        this.infinite = this.options.infinite === 'true' ? true : false ;
        this.bullets = [];
        this.freeNav = this.options.freeNav === 'true' ? true : false ;
        this.freeNavBreakPoint = parseInt(this.options.freeNavBreakPoint) || 0 ;
        this.offset = parseInt(this.options.offset) > 0 ? parseInt(this.options.offset) : 0 ;
        if( this.options.bullets){
            this.bulletContainer = this.createElement('div', 'slider-bullets');
            for(let i = 0;i < this.slides.length;i++){
                let btn = this.createElement('button','slider-bullets__bullet', i+1);
                btn.setAttribute('data-index', i);
                this.bullets = [...this.bullets, btn];
                this.bulletContainer.appendChild(btn);
            }
            el.appendChild(this.bulletContainer);
        }
        this.activeIndex = parseInt(this.options.initialSlide) || 0;
        this.el = el;
        this.scrollValue = 0;
        this.scrollStart = 0;
        this.mouseDown = false;
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
        for(let i = 0; i < this.slides.length;i++) {
            this.slides[i].style.marginRight = `${this.offset}px`;
        }
        this.toggleActiveSlide({init: true});
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
        this.wrapper.addEventListener('scroll', () => {
            this.handleActiveClassOnScroll();
        },{passive:true});
    }

    handleActiveClassOnScroll(){
        const wrapperBoxLeft = this.wrapper.getBoundingClientRect().x;
        const sensitivity = 10;
        for(let i = 0;i < this.slides.length;i++){
                this.bullets[i].classList.remove(`slider-bullets__bullet--active`);
                this.slides[i].classList.remove(
                `${this.slidesClassName}--prev`,
                `${this.slidesClassName}--active`,
                `${this.slidesClassName}--next`,
                );

                if(this.slides[i].getBoundingClientRect().x <= (wrapperBoxLeft + sensitivity) 
                && this.slides[i].getBoundingClientRect().x >= (wrapperBoxLeft - sensitivity) ){
                    this.activeIndex = i;
                }
        }
        this.bullets[this.activeIndex].classList.add(`slider-bullets__bullet--active`);
        let prevIndex = this.activeIndex <= 0 ? this.slides.length - 1 : this.activeIndex - 1 ;
        let nextIndex = this.activeIndex >= (this.slides.length-1) ? 0 : this.activeIndex + 1 ;
        this.slides[prevIndex].classList.add(`${this.slidesClassName}--prev`);
        this.slides[nextIndex].classList.add(`${this.slidesClassName}--next`);
        this.slides[this.activeIndex].classList.add(`${this.slidesClassName}--active`);
    }

    toggleActiveSlide(options){
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
        
        let prevIndex = this.activeIndex <= 0 ? this.slides.length - 1 : this.activeIndex - 1 ;
        let nextIndex = this.activeIndex >= (this.slides.length-1) ? 0 : this.activeIndex + 1 ;
        
        this.slides[prevIndex].classList.add(`${this.slidesClassName}--prev`);
        this.slides[nextIndex].classList.add(`${this.slidesClassName}--next`);
        this.slides[this.activeIndex].classList.add(`${this.slidesClassName}--active`);
        
        let scrollToStart = (this.activeIndex === 0 || options.init === true) ? true : false ;
        let scrollToEnd = (this.activeIndex === this.slides.length - 1) || false ;
        // let lastSlide = this.slides[this.slides.length - 1].getBoundingClientRect();
        // let wrapperBox = this.wrapper.getBoundingClientRect();
        // let lastSlideIsVisible = lastSlide.left + lastSlide.width < wrapperBox.left + wrapperBox.width;
        let scrollPrev = options.type === 'prev' || false ;
        let scrollNext = options.type === 'next' || false ;
        let bulletPick = options.type === 'bullet' || false ;
        let scrollBox = this.slides[this.activeIndex].getBoundingClientRect();

        if(scrollToStart){
            this.scrollValue = 0;
            if(!this.infinite){
                this.toggleButtons('start');
            }
        } else if(scrollToEnd) {
            this.scrollValue = this.getSlidesTotalWidth();
            if(!this.infinite){
                this.toggleButtons('end');
            }
        } else {
            this.scrollValue = this.getAbsolutePositionFromIndex();
            if(!this.infinite){
                this.toggleButtons();
            }
        }

        let offsetCompliment = 0;
        if(this.activeIndex > 0 && this.activeIndex !== (this.slides.length - 1) ){
            offsetCompliment = this.activeIndex * this.offset;
        } else if(this.activeIndex === (this.slides.length - 1)) {
            offsetCompliment = (this.slides.length - 1) * this.offset;
        } else {
            offsetCompliment = 0;
        }

        let left = Math.abs(this.scrollValue) + offsetCompliment;
        let behavior = 'smooth';
        
        this.wrapper.scrollTo({ left, behavior });
    }

    lastSlideIsVisible(left) {
        const carouselBox = this.el.getBoundingClientRect();
        return (left - carouselBox.width ) > carouselBox.width;
    }

    toggleButtons(type = ''){
        if(type === 'start'){
            this.nextButton.style.display = 'block';
            this.prevButton.style.display = 'none';
        } else if(type === 'end'){
            this.nextButton.style.display = 'none';
            this.prevButton.style.display = 'block';
        } else {
            this.nextButton.style.display = 'block';
            this.prevButton.style.display = 'block';
        }
    }

    getAbsolutePositionFromIndex(){
        let width = 0;
        for(let i = 0; i < this.activeIndex;i++){
            width += this.slides[i].getBoundingClientRect().width;
        }
        return width;
    }

    getSlidesTotalWidth(){
        let width = 0;
        for(let i = 0; i < this.slides.length;i++){
            width += this.slides[i].getBoundingClientRect().width;
        }
        return width;
    }

    bulletClick(element){
        this.activeIndex = parseInt( element.getAttribute('data-index') );
        this.toggleActiveSlide({type: 'bullet'});
    }

    slidePrev(){
        if(this.activeIndex <= 0) {
            this.activeIndex = this.slides.length-1;
        } else {
            this.activeIndex--;
        }
        this.toggleActiveSlide({type: 'prev'});
    }

    slideNext(){
        if(this.activeIndex >= this.slides.length-1) {
            this.activeIndex = 0;
        } else {
            this.activeIndex++;
        }
        this.toggleActiveSlide({type: 'next'});
    }
}

export default Carousel;