'use strict';

/**
 * Application bootstrapping
 */
import MainController from 'controllers/MainController';
import { services } from 'config/services';
import { NL, EN } from 'config/config';
import I18n from 'framework/I18n';

window.languages = {
    [ NL ]: '/js/translations/translations.nl.json',
    [ EN ]: '/js/translations/translations.en.json'
};
window.service = services;

I18n.fetchLanguages(
    () => { new MainController(); }
);
