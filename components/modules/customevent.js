class CustomEvent {
    constructor(el){
        this.targets = document.querySelectorAll(el.dataset.target);
        this.event = new Event('letscolor');
        this.el = el;
        this.addEvents();
    }

    addEvents(){
        window.addEventListener('letscolor', (e) =>{
            this.el.classList.toggle('active');
            this.targets.forEach(el => {
                if(this.el.classList.contains('active')){ 
                    this.activate(el);
                } else {
                    this.hideElements(el);
                }     
            })
        });

        this.el.addEventListener('click', (e) =>{
            e.preventDefault();
            window.dispatchEvent(this.event);
        });
    }

    activate(element){
        const options = { ...element.dataset };
        Object.assign(element.style, { display: 'block', background: `${options.color}`, left: `${options.positionX}px`, top: `${options.positionY}px` });
    }

    hideElements(element){
        element.style.display = 'none';
    }
}

export default CustomEvent;