'use strict';

import nl from '../translations/translations.nl.json';
import en from '../translations/translations.en.json';
import { NL, EN } from '../config/config';

let LANG = '';

export default class I18n {

    static getTranslation(key, lang) {
        if (lang === undefined) {
            I18n.determineLanguage();
        } else {
            LANG = lang;
        }
        switch (LANG) {
            case NL:
                return nl[key];
            case EN:
                return en[key];
            default:
                throw new EvalError('Wrong language');
        }
    }

    static determineLanguage() {
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
        return LANG;
    }

    static getRoute(key, slug, lang) {
        if (lang !== undefined) {
            LANG = lang;
        }
        let translation = '';
        switch (LANG) {
            case NL:
                translation = nl[key + '.route'];
                break;
            case EN:
                translation = en[key + '.route'];
                break;
            default:
                throw new URIError('Cannot find route');
        }
        if (slug !== undefined && slug !== null) {
            translation = translation.replace(':slug', slug);
        }
        return translation;
    }
}
