'use strict';

import I18n from '../framework/I18n';

export const initialState = {
    navigationInitialized: false,
    languageNavigationInitialized: false,
    navigation: [
        {
            name: I18n.getTranslation('home'),
            href: I18n.getRoute('home'),
            key: 'navigation-' + I18n.getTranslation('home.page.id')
        },
        {
            name: I18n.getTranslation('cases'),
            href: I18n.getRoute('cases'),
            key: 'navigation-' + I18n.getTranslation('cases.page.id')
        },
        {
            name: I18n.getTranslation('about'),
            href: I18n.getRoute('about'),
            key: 'navigation-' + I18n.getTranslation('about.page.id')
        },
        {
            name: I18n.getTranslation('contact'),
            href: I18n.getRoute('contact'),
            key: 'navigation-' + I18n.getTranslation('contact.page.id')
        }
    ]
};
