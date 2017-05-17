'use strict';

import { addObservable } from '../framework/State';
import Container from '../framework/Container';

export default class Header {

    constructor() {
        addObservable(this);
    }

    static getId() {
        return 'header';
    }

    render() {
        return ([
            '<header id="' + this.constructor.getId() + '">',
            ... Container.getService('menu_button').render(),
            '</header>'
        ]);
    }

}
