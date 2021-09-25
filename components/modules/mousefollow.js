
class MouseFollow {
    constructor(el){
        this.elementPosition = el.getBoundingClientRect();
        this.deg = 0;
        this.strength = 3; // higher value is less strong
        this.el = el;
        this.parent = el.parentElement;
        this.parentHover = false;
        this.hit = false; // if mouse is hovering the target element
        this.mousePosition = {
            x: 0,
            y: 0,
        }
        this.midPoint = {
            x: this.elementPosition.x + (this.elementPosition.width / 2),
            y: this.elementPosition.y + (this.elementPosition.height / 2)
        };
        this.bullsEye = {
            top: this.elementPosition.y,
            right: this.elementPosition.x + this.elementPosition.width,
            bottom: this.elementPosition.y + this.elementPosition.height,
            left: this.elementPosition.x,
        };
        this.addEvents();
    }

    addEvents(){
        window.addEventListener('mousemove', (e) => {
            this.follow(e);
        })
        this.parent.addEventListener('mouseenter', () => {
            this.parentHover = true;
        })
        this.parent.addEventListener('mouseout', () => {
            this.parentHover = false;
        })
    }

    follow(e){
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;

        this.hit = (this.mousePosition.x > this.bullsEye.left && this.mousePosition.x < this.bullsEye.right) && (this.mousePosition.y > this.bullsEye.top && this.mousePosition.y < this.bullsEye.bottom) ? true : false ;
        
        let x = this.mousePosition.x < this.midPoint.x ? `-${Math.abs(this.mousePosition.x)}` : `${Math.abs(this.mousePosition.x)}` ;
        let y = this.mousePosition.y < this.midPoint.y ? `-${Math.abs(this.mousePosition.x)}` : `${Math.abs(this.mousePosition.x)}` ;
        let z = 0;
        x = `${x/this.strength*1.2}%`;
        y = `${y/this.strength}%`;

        let color = {
            red: Math.abs(this.mousePosition.x) / 3 < 255 ? Math.abs(this.mousePosition.x) / 3 : 255 ,
            green: (Math.abs(this.mousePosition.x) / Math.abs(this.mousePosition.y)) < 255 ? Math.abs(this.mousePosition.x) / Math.abs(this.mousePosition.y) : 255 ,
            blue: Math.abs(this.mousePosition.y) / 3 < 255 ? Math.abs(this.mousePosition.y) / 3 : 255 ,
        };
        
        console.log(this.hit, this.parentHover);
        if(this.hit || this.parentHover) {
            this.el.style.transform = `translate3d(-50%,-50%,0)`;
            this.el.style.background = `rgb(${color.red <= 0 ? 0: color.red},${color.green <= 0 ? 0 : color.green},${color.blue <= 0 ? 0 : color.blue})`;
        } else {
            this.el.style.transform = `translate3d(${x},${y},${z})`;
            this.el.style.background = `rgb(${color.red <= 0 ? 0: color.red},${color.green <= 0 ? 0 : color.green},${color.blue <= 0 ? 0 : color.blue})`;
        }
    }
}

export default MouseFollow;