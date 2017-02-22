'use strict';

/**
 * Application bootstrapping
 */
import MainController from 'controllers/MainController';
import { services } from 'config/services';
import { NL, EN } from 'config/config';
import I18n from 'framework/I18n';
import { initialState } from 'framework/initialState';
import { dispatch } from 'framework/State';

window.languages = {
    [ NL ]: '/js/translations/translations.nl.json',
    [ EN ]: '/js/translations/translations.en.json'
};
window.service = services;

/**
 * Bring in the initial state and fetch the languages
 */
initialState('/js/initial/initialState.json', data => {
    dispatch({
       data: data
    });
    I18n.fetchLanguages(
        () => { new MainController(); }
    );
});
