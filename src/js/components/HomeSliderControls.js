'use strict';

import { addObservable, getState, dispatch } from '../framework/State';
import { ON_RENDERED, ON_HOME_SLIDER_NAVIGATE } from '../config/actions';

export default class HomeSliderControls {

    constructor() {
        addObservable(this);
        this.buttonClick = this.onButtonClick.bind(this);
        this.buttonMouseOver = this.onButtonMouseOver.bind(this);
        this.buttonMouseLeave = this.onButtonMouseLeave.bind(this);
    }

    static getId() {
        return 'home-slider-controls';
    }

    [ON_RENDERED]() {
        this.buttons = document.querySelectorAll('#' + this.constructor.getId() + ' > ul > li');
        if (this.active === undefined) {
            this.active = 0;
        }
        this.setActive(this.active);
    }

    getSlidesButtons() {
        let slides = getState('homeSlides');
        let items = [];
        for (let i in slides) {
            if (slides.hasOwnProperty(i)) {
                items.push('<li><a href="#" class="hexagon"></a></li>');
            }
        }
        return items;
    }

    onButtonClick(event) {
        event.preventDefault();
        let target = event.currentTarget.children[0];
        let index = Array.from(this.buttons).indexOf(target.parentElement);
        dispatch({
            listener: ON_HOME_SLIDER_NAVIGATE,
            data: {
                index: index
            }
        });
        this.setActive(index);
    }

    onButtonMouseOver(event) {
        let list = event.currentTarget;
        list.classList.add('hover');
        let active = document.querySelector('#' + this.constructor.getId() + ' > ul > li.active');
        if (active !== list) {
            active.classList.add('dimm');
        }
    }

    onButtonMouseLeave(event) {
        let list = event.currentTarget;
        list.classList.remove('hover');
        let active = document.querySelector('#' + this.constructor.getId() + ' > ul > li.active');
        active.classList.remove('dimm');
    }

    events() {
        Array.from(this.buttons).map(link => {
            link.removeEventListener('click', this.buttonClick);
            link.addEventListener('click', this.buttonClick);
            link.removeEventListener('mouseenter', this.buttonMouseOver);
            link.addEventListener('mouseenter', this.buttonMouseOver);
            link.removeEventListener('mouseleave', this.buttonMouseLeave);
            link.addEventListener('mouseleave', this.buttonMouseLeave);
        });
    }

    setActive(index) {
        Array.from(this.buttons).map((link, i) => {
            link.classList.remove('dimm');
            if (i === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    render() {
        return (
            [
                '<div id="' + this.constructor.getId() + '"><ul>',
                ... this.getSlidesButtons(),
                '</ul></div>'
            ]
        );
    }
}
