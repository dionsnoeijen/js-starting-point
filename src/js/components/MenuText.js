'use strict';

import { addObservable } from '../framework/State';
import { ON_RENDERED } from '../config/actions';

export default class MenuText {

    constructor() {
        addObservable(this);

        this.OPAQUE = 'opaque';
        this.ACTIVE = 'active';
        this.MOVE_TO_LEFT = 'move-to-left';
    }

    static getId() {
        return 'menu-text';
    }

    [ON_RENDERED]() {
        this.menuText = document.querySelector('#' + this.constructor.getId());
    }

    updateTitle(text) {
        let title = document.querySelector('#' + this.constructor.getId() + ' > h1');
        title.innerHTML = text;
    }

    clearClasses() {
        this.menuText.className = '';
    }

    toggleOpaque() {
        return this.menuText.classList.toggle(this.OPAQUE);
    }

    addOpaque() {
        this.menuText.classList.add(this.OPAQUE);
    }

    containsMoveToLeft() {
        return this.menuText.classList.contains(this.MOVE_TO_LEFT);
    }

    removeMoveToLeft() {
        this.menuText.classList.remove(this.MOVE_TO_LEFT);
    }

    toggleMoveToLeft() {
        return this.menuText.classList.toggle(this.MOVE_TO_LEFT);
    }

    toggleActive() {
        return this.menuText.classList.toggle(this.ACTIVE);
    }

    removeActive() {
        this.menuText.classList.remove(this.ACTIVE);
    }

    containsActive() {
        return this.menuText.classList.contains(this.ACTIVE);
    }

    render() {
        return ([
            '<div id="' + this.constructor.getId() + '">',
            '<h1></h1>',
            '</div>'
        ]);
    }

}
