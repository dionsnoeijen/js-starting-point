'use strict';

import { dispatch, addObservable } from '../framework/State';

export default class HomeSlider {

    constructor() {
        addObservable(this);
    }

    static getId() {
        return 'home-slider';
    }

    render() {
        return ([
            '<div id="' + this.constructor.getId() + '">',
                '<img src="img/slider-1.jpg" alt="amazing interior image" />',
                '<img src="img/slider-2.jpg" alt="amazing interior image" />',
                '<img src="img/slider-3.jpg" alt="amazing interior image" />',
            '</div>'
        ]);
    }
}
