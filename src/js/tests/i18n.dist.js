'use strict';

import { assert, expect } from 'chai';
import I18n from '../framework/I18n';

describe('I18n', () => {

    let location = { pathname: '/en/location' };
    let EN = 'en';
    let enLanguageData = {
        'title': 'A title',
        'subtitle': 'A subtitle',
        'some.route': '/en/something/:route'
    };
    let NL = 'nl';
    let nlLanguageData = {
        'title': 'Een titel',
        'subtitle': 'Een subtitel',
        'some.route': '/nl/iets/:route'
    };

    beforeEach(() => {
        window.languages = {
            nl: '/js/translations/translations.nl.json',
            en: '/js/translations/translations.en.json'
        };
        I18n.setLanguage(NL, nlLanguageData);
        I18n.setLanguage(EN, enLanguageData);
        I18n.determineLanguage(location);
    });

    describe('setLanguage(key, data)', () => {
        it ('should set language data with a language key', () => {
            assert.equal(I18n[EN], enLanguageData);
            assert.equal(I18n[NL], nlLanguageData);
        });
    });
    describe('getTranslation(key, lang)', () => {
        it('should get a specific translation by key', () => {
            let title = I18n.getTranslation('title');
            let subTitle = I18n.getTranslation('subtitle');
            assert.equal(title, enLanguageData.title);
            assert.equal(subTitle, enLanguageData.subtitle);
        });
        it('should get a specific translation by key and language', () => {
            let title = I18n.getTranslation('title', NL);
            let subTitle = I18n.getTranslation('subtitle', NL);
            assert.equal(title, nlLanguageData.title);
            assert.equal(subTitle, nlLanguageData.subtitle);
        });
    });
    describe('getRoute(key, slug, lang)', () => {
        it('should get a route defined in the translations file', () => {
            let route = I18n.getRoute('some');
            assert.equal(route, enLanguageData['some.route']);
        });
        it('should get a route and replace the slug placeholder', () => {
            let route = I18n.getRoute('some', 'super-slug');
            assert.equal(route, enLanguageData['some.route'].replace(':slug', 'super-slug'));
        });
        it('should get a specific route by language key', () => {
            let route = I18n.getRoute('some', undefined, NL);
            assert.equal(route, nlLanguageData['some.route']);
            route = I18n.getRoute('some', 'een-slug', NL);
            assert.equal(route, nlLanguageData['some.route'].replace(':slug', 'een-slug'));
        });
    });
});
