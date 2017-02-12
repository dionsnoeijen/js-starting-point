'use strict';

import { dispatch, addObservable } from '../helpers/State';
import I18n from '../helpers/i18n';

export default class Header {

    constructor(router, navigation, languageNavigation) {
        this.router = router;
        this.navigation = navigation;
        this.languageNavigation = languageNavigation;
        this.ID = 'header-' + I18n.determineLanguage();
    }

    static create(router, navigation, languageNavigation) {
        let header = new Header(router, navigation, languageNavigation);
        addObservable(header);
        dispatch({
             data: {
                 headerCreated: true
             }
        });
        return header;
    }

    render() {
        return ([
            '<header id="' + this.ID + '">',
            ... this.navigation.render(),
            ... this.languageNavigation.render(),
            '</header>'
        ]);
    }

}
