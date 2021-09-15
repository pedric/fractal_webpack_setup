class Avatar {
    constructor(el){
        this.el = el;
        this.addEvents();
    }

    slide(){
        this.el.classList.contains('contact-card--active') ?
        this.el.classList.remove('contact-card--active') :
        this.el.classList.add('contact-card--active');
    }

    async twist() {
        return await Promise.resolve('click a card');
    }

    addEvents() {
        this.el.addEventListener('click', () => {
            this.slide();
            this.twist().then(res => console.log(res));
        });
    }
}

export default Avatar;