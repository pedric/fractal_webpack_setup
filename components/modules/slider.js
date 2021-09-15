class InnerSlide {
				constructor(el) {
					this.el = el;
					this.prevButton = el.querySelector('.arrow-prev');
					this.nextButton = el.querySelector('.arrow-next');
					this.activeIndex = 0;
					this.slides = el.querySelectorAll('.giftcard__body__description');
					this.initSlider();
				}

				initSlider(){
					this.slides[this.activeIndex].classList.add('active');
				}

				addEvents(){
					this.prevButton.addEventListener('click', () => {
						this.slidePrev();
					})
					this.nextButton.addEventListener('click', () => {
						this.slideNext();
					})
				}

				toggleActiveSlide(){
					for(let i = 0;i < this.slides.length;i++){
						if(this.slides[i].classList.contains('active')){
							this.slides[i].classList.remove('active');
						}
					}
					this.slides[this.activeIndex].classList.add('active');
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