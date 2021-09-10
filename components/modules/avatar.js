class Avatar {
    constructor(el){
        this.el = el;
        this.addEvents();
    }

    log(){
        console.log(this.el);
    }

    addEvents(){
        this.el.addEventListener('click', () => {
            this.log();
        });
    }
}

export default Avatar;