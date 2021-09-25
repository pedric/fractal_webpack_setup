class CustomEvent {
    constructor(el){
        this.el = el;
        this.target = document.querySelector(el.dataset.target);
        this.event = new Event('letscolor');
        this.addEvents();
    }

    addEvents(){
        window.addEventListener('letscolor', (e) =>{
            console.log(e);
            this.target.style.background = 'coral';
        });

        this.el.addEventListener('click', () =>{
            window.dispatchEvent(this.event);
        });

    }
}

export default CustomEvent;