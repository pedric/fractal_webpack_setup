class Accordion {
    constructor(el){
        this.el = el;
        this.options = { ...el.dataset };
        this.trigger = el.querySelector(this.options.trigger);
        this.target = el.querySelector(this.options.target);
        this.init();
    }

    init(){
        this.trigger.addEventListener('click', () => {
            this.toggle();
        })
    }

    toggle(){
        if(this.options.clearOnToggle === 'true'){
            this.closeAll();
        }
        if(this.options.cssMode === 'true'){
            this.el.classList.toggle(this.options.modifier);
        } else {
            if(this.target.offsetHeight === 0){
                this.target.style.height = `${this.target.scrollHeight}px`;
                this.el.classList.add(this.options.modifier)
            } else {
                this.target.style.height = '0px';
                this.el.classList.remove(this.options.modifier)
            }
        }
    }

    closeAll(){
        let elements = this.el.parentElement.children;
        for(let i = 0;i < elements.length;i++){
            if(this.options.cssMode === 'true'){
                elements[i].classList.remove(this.options.modifier);
            } else {
                let accordionBody = elements[i].querySelector(this.options.target);
                elements[i].classList.remove(this.options.modifier);
                accordionBody.style.height = '0px';
            }
        }
    }
}

export default Accordion;