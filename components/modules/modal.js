class Modal {
    constructor(el){
        this.options = { ...el.dataset } || {};
        this.target = document.querySelector(this.options.target);
        this.modal = {
            open: false,
            closed: true
        }
        this.el = el;
        this.closeOnWindowLeave = this.options.closeOnWindowLeave === 'true' ? true : false ;
        this.closeOnOutsideClick = this.options.closeOnOutsideClick === 'true' ? true : false ;
        this.closeButton = document.querySelector(this.options.closeElement);
        this.addEvents();
    }

    open(){
        this.target.classList.add(this.options.activeClass);
        this.modal.open = true;
        this.modal.closed = false;
        if(this.options.onOpen){
            window[this.options.onOpen]();
        }
    }

    close(){
        this.target.classList.remove(this.options.activeClass);
        if(this.options.onClose){
            window[this.options.onClose]();
        }
    }

    handleClick(e){
        if(e.target.classList.value === this.target.classList.value && this.closeOnOutsideClick === true){
            this.close();
        }
    }

    addEvents(){
        this.el.addEventListener('click', () => {
            this.open();
        })
        if(this.closeButton){
            this.closeButton.addEventListener('click', () => {
                this.close();
            })
        }
        this.target.addEventListener('click', (e) => {
            this.handleClick(e);
        })
    }

    parseBool(str){
        if(str === 'true'){
            return true;
        }
        return false;
    }
}

export default Modal;