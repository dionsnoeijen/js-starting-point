'use strict';

import Navigo from 'navigo';
import Routes from './Routes';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import LanguageNavigation from '../components/LanguageNavigation';
import HomeController from '../controllers/HomeController';
import AboutController from '../controllers/AboutController';
import CasesController from '../controllers/CasesController';
import CaseController from '../controllers/CaseController';
import CaseSlidesController from '../controllers/CaseSlidesController';
import ContactController from '../controllers/ContactController';
import NotFoundController from '../controllers/NotFoundController';

const navigo = new Navigo(null, false);
const routes = new Routes(navigo);
const navigation = Navigation.create(navigo);
const languageNavigation = LanguageNavigation.create(navigo);
const header = Header.create(navigo, navigation, languageNavigation);
const home = HomeController.create(navigo, header);
const about = AboutController.create(navigo, header);
const cases = CasesController.create(navigo, header);
const oneCase = CaseController.create(navigo, header);
const caseSlides = CaseSlidesController.create(navigo, header);
const contact = ContactController.create(navigo, header);
const notFound = NotFoundController.create();

export const services = {
    router: navigo,
    routes: routes,
    navigation: navigation,
    language_navigation: languageNavigation,
    component_header: header,
    controller_home: home,
    controller_about: about,
    controller_cases: cases,
    controller_case: oneCase,
    controller_case_slides: caseSlides,
    controller_contact: contact,
    controller_not_found: notFound
};
