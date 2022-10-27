class Slider {
    constructor({
        nextBtnSelector,
        prevBtnSelector,
        listSelector,
        dotsSelector,
    }) {
        this.nextBtn = document.querySelector(nextBtnSelector);
        this.prevBtn = document.querySelector(prevBtnSelector);
        this.list = document.querySelector(listSelector);
        this.dots = document.querySelector(dotsSelector);
    }

    swiper = undefined;

    changeItem({ active, newElement, activeD, newElementD }) {
        if (newElement) {
            active.classList.remove('active');
            newElement.classList.add('active');
            activeD.classList.remove('active');
            newElementD.classList.add('active');
        }
    }

    btnNotActive() {
        this.activeLi = this.list.querySelector('.active');

        if (!this.activeLi.previousElementSibling) {
            this.prevBtn.classList.add('disabled');
        } else {
            this.prevBtn.classList.remove('disabled');
        }

        if (!this.activeLi.nextElementSibling) {
            this.nextBtn.classList.add('disabled');
        } else {
            this.nextBtn.classList.remove('disabled');
        }
    }

    nextSlider() {
        this.nextBtn.addEventListener('click', () => {
            this.activeLi = this.list.querySelector('.active');
            this.activeDot = this.dots.querySelector('.active');
            this.changeItem({
                newElement: this.activeLi.nextElementSibling,
                active: this.activeLi,
                newElementD: this.activeDot.nextElementSibling,
                activeD: this.activeDot,
            });

            this.btnNotActive();
            clearInterval(this.swiper);
            this.autoSlide()
        });
    }

    prevSlider() {
        this.prevBtn.addEventListener('click', () => {
            this.activeLi = this.list.querySelector('.active');
            this.activeDot = this.dots.querySelector('.active');
            this.changeItem({
                newElement: this.activeLi.previousElementSibling,
                active: this.activeLi,
                newElementD: this.activeDot.previousElementSibling,
                activeD: this.activeDot,
            });
            this.btnNotActive();
            clearInterval(this.swiper);
            this.autoSlide()
        });
    }

    renderSlide = () => {
        this.activeLi = this.list.querySelector('.active');
        this.activeDot = this.dots.querySelector('.active');
        if (this.activeLi.nextElementSibling) {
            this.changeItem({
                newElement: this.activeLi.nextElementSibling,
                active: this.activeLi,
                newElementD: this.activeDot.nextElementSibling,
                activeD: this.activeDot,
            });

            this.btnNotActive();
        } else {
            clearInterval(this.swiper)
        }
    };

    autoSlide() {
        this.swiper = setInterval(this.renderSlide, 5000);
    }
}

let slider1 = new Slider({
    nextBtnSelector: '.js--slider__next',
    prevBtnSelector: '.js--slider__prev',
    listSelector: '.js--list',
    dotsSelector: '.dots__container',
});

slider1.nextSlider();
slider1.prevSlider();
slider1.btnNotActive();
slider1.autoSlide();

