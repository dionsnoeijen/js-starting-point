'use strict';

import { dispatch, addObservable } from 'helpers/State';
import { NL, EN } from 'config/config';
import {
    ON_ROUTE_HOME,
    ON_ROUTE_ABOUT,
    ON_ROUTE_CASES,
    ON_ROUTE_CASE,
    ON_ROUTE_CASE_SLIDES,
    ON_ROUTE_CONTACT,
    ON_ROUTE_NOT_FOUND
} from './actions';

export default class Routes {

    constructor(router, i18n) {
        this.router = router;
        this.i18n = i18n;

        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.on({
            [ this.i18n.getRoute('about', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_ABOUT,
                    data: {
                        lang: EN
                    }
                });
            },
            [ this.i18n.getRoute('about', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_ABOUT,
                    data: {
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('cases', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CASES,
                    data: {
                        lang: EN
                    }
                });
            },
            [ this.i18n.getRoute('cases', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CASES,
                    data: {
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('case', null, EN) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE,
                    data: {
                        parameters: parameters,
                        data: {
                            lang: EN
                        }
                    }
                });
            },
            [ this.i18n.getRoute('case', null, NL) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE,
                    data: {
                        parameters: parameters,
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('case.slides', null, EN) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE_SLIDES,
                    data: {
                        parameters: parameters,
                        lang: EN
                    }
                });
            },
            [ this.i18n.getRoute('case.slides', null, NL) ]: (parameters) => {
                dispatch({
                    listener: ON_ROUTE_CASE_SLIDES,
                    data: {
                        parameters: parameters,
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('contact', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CONTACT,
                    data: {
                        lang: EN
                    }
                });
            },
            [ this.i18n.getRoute('contact', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_CONTACT,
                    data: {
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('home', null, EN) ]: () => {
                dispatch({
                    listener: ON_ROUTE_HOME,
                    data: {
                        lang: EN
                    }
                });
            },
            [ this.i18n.getRoute('home', null, NL) ]: () => {
                dispatch({
                    listener: ON_ROUTE_HOME,
                    data: {
                        lang: NL
                    }
                });
            },
            [ this.i18n.getRoute('404', null, EN) ]: () => {
                if (window.location.pathname !== this.i18n.getRoute('home', null, EN)) {
                    dispatch({
                        listener: ON_ROUTE_NOT_FOUND,
                        data: {
                            lang: EN
                        }
                    });
                }
                this.router.navigate(this.i18n.getRoute('home', null, EN), true);
            },
            [ this.i18n.getRoute('404', null, NL) ]: () => {
                if (window.location.pathname !== '/') {
                    dispatch({
                        listener: ON_ROUTE_NOT_FOUND,
                        data: {
                            lang: NL
                        }
                    });
                }
                this.router.navigate(this.i18n.getRoute('home', null, NL), true);
            }
        });
        this.router.resolve();
    }
}
