'use strict';

import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';
import Container from '../framework/Container';

export default class Header {

    constructor() {
        addObservable(this);
        dispatch({
            data: {
                headerCreated: true
            }
        });
        this.ID = 'header-' + I18n.determineLanguage();
    }

    render() {
        return ([
            '<header id="' + this.ID + '">',
            ... Container.getService('navigation').render(),
            ... Container.getService('language_navigation').render(),
            '</header>'
        ]);
    }

}
