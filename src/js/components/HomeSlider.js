'use strict';

import { addObservable, getState } from '../framework/State';
import { ON_HOME_SLIDER_NAVIGATE, ON_RENDERED } from '../config/actions';

export default class HomeSlider {

    constructor() {
        addObservable(this);
        this.CLASS_INACTIVE_LEFT = 'inactive-left';
        this.CLASS_INACTIVE_RIGHT = 'inactive-right';
        this.CLASS_ACTIVE = 'active';
    }

    static getId() {
        return 'home-slider';
    }

    getSlides() {
        let slides = getState('homeSlides');
        if (this.active === undefined) {
            this.active = 0;
        }
        slides.reverse();
        let items = [];
        for (let i in slides) {
            if (slides.hasOwnProperty(i)) {
                items.push('<img src="' + slides[i] + '" alt="Slider interior image">');
            }
        }
        slides.reverse();
        return items;
    }

    [ON_HOME_SLIDER_NAVIGATE](data) {
        this.active = data.index;
        this.switch(this.active);
    }

    [ON_RENDERED]() {
        let slides = document.querySelectorAll('#' + this.constructor.getId() + ' > img');
        this.slides = Array.from(slides);
        this.switch(this.active);
    }

    switch(index) {
        for (let i in this.slides) {
            if (this.slides.hasOwnProperty(i)) {
                i = parseInt(i);
                this.slides[i].classList.remove(this.CLASS_INACTIVE_LEFT);
                this.slides[i].classList.remove(this.CLASS_INACTIVE_RIGHT);
                this.slides[i].classList.remove(this.CLASS_ACTIVE);
                if (i < index) {
                    this.slides[i].classList.add(this.CLASS_INACTIVE_LEFT);
                }
                if (i === index) {
                    this.slides[i].classList.add(this.CLASS_ACTIVE);
                }
                if (i > index) {
                    this.slides[i].classList.add(this.CLASS_INACTIVE_RIGHT);
                }
            }
        }
    }

    render() {
        return ([
            '<div id="' + this.constructor.getId() + '" class="ready">',
            ... this.getSlides(),
            '</div>'
        ]);
    }

    animateIn() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('out');
        element.classList.add('in');
    }

    animateOut() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('in');
        element.classList.add('out');
    }
}
