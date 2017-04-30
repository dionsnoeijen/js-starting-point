'use strict';

import { dispatch, addObservable } from '../framework/State';
import I18n from '../framework/I18n';
import Container from '../framework/Container';

export default class Header {

    constructor() {
        addObservable(this);
        dispatch({
            data: {
                headerCreated: true
            }
        });
    }

    static getId() {
        return 'header-' + I18n.determineLanguage(window.location);
    }

    render() {
        return ([
            '<header id="' + this.constructor.getId() + '">',
            ... Container.getService('menu_button').render(),
            '</header>'
        ]);
    }

}
