'use strict';

import nl from 'translations/translations.nl.json';
import en from 'translations/translations.en.json';
import { NL, EN } from 'config/config';

let LANG = '';

export default class I18n {

    getTranslation(key) {
        this.determineLanguage();
        switch (LANG) {
            case NL:
                return nl[key];
            case EN:
                return en[key];
            default:
                return 'NO TRANSLATION';
        }
    }

    determineLanguage() {
        switch (window.location.pathname.split('/')[1]) {
            case NL:
                LANG = NL;
                break;
            case EN:
                LANG = EN;
                break;
            default:
                LANG = NL;
                break;
        }
    }
}
