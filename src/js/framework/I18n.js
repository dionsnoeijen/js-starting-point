'use strict';

let LANG = '';

export default class I18n {

    static fetchLanguages(callback) {
        let expect = Object.keys(window.languages).length;
        let loaded = 0;
        if (window.languages !== undefined) {
            for (let key in window.languages) {
                if (window.languages.hasOwnProperty(key)) {
                    let request = new XMLHttpRequest();
                    request.addEventListener('load', (data) => {
                        I18n.setLanguage(key, JSON.parse(data.currentTarget.response));
                        loaded++;
                        if (loaded === expect) {
                            callback();
                        }
                    });
                    request.open('GET', window.languages[key], true);
                    request.send();
                }
            }
        }
    }

    static setLanguage(key, data) {
        I18n[key] = data;
    }

    static getTranslation(key, lang) {
        if (lang === undefined) {
            I18n.determineLanguage();
        } else {
            LANG = lang;
        }
        if (I18n[LANG] !== undefined && I18n[LANG][key] !== undefined) {
            return I18n[LANG][key];
        }
        return false;
    }

    static determineLanguage() {
        let lang = window.location.pathname.split('/')[1];
        if (window.languages !== undefined && window.languages.hasOwnProperty(lang)) {
            return lang;
        }
        // throw new EvalError('No language indicator');
    }

    static getRoute(key, slug, lang) {
        if (lang !== undefined) {
            LANG = lang;
        }
        let translation = '';
        if (window.languages !== undefined && window.languages.hasOwnProperty(LANG)) {
            translation = I18n[LANG][key + '.route'];
            if (slug !== undefined && slug !== null) {
                translation = translation.replace(':slug', slug);
            }
            return translation;
        }
        return false;
    }
}
