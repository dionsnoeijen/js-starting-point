'use strict';

import Snap from 'snapsvg';
import { addObservable, dispatch } from '../framework/State';
import { ON_RENDERED, ON_OPEN_MENU, ON_CLOSE_MENU } from '../config/actions';

export default class MenuButton {

    constructor() {
        addObservable(this);
        this.SVG_ANIMATION_ID = 'menu-button_animation';
        this.animationInitialized = false;
        this.isCross = false;
        this.buttonClick = this.onButtonClick.bind(this);
        this.mouseOver = this.onMouseOver.bind(this);
        this.mouseLeave = this.onMouseLeave.bind(this);
    }

    static getId() {
        return 'menu-button';
    }

    [ON_RENDERED]() {
        if (!this.animationInitialized) {
            this.button = document.querySelector('#' + this.SVG_ANIMATION_ID);
            this.drawSvg();
            this.animationInitialized = true;
        }
    }

    [ON_CLOSE_MENU]() {
        this.closeMenu();
    }

    onButtonClick() {
        if (!this.isCross) {
            dispatch({listener: ON_OPEN_MENU});
            this.openMenu();
            return;
        }
        dispatch({listener: ON_CLOSE_MENU});
    }

    onMouseOver() {
        if (!this.isCross) {
            this.lines[0].animate({y: 4}, 100, function () {
                this.lines[0].animate({y: 7}, 100);
            }.bind(this));
            this.lines[2].animate({y: 26}, 100, function () {
                this.lines[2].animate({y: 23}, 100);
            }.bind(this));
        } else {
            let bbox = this.group.getBBox();
            this.group.animate({transform: 's1.1,' + bbox.cx + ','+ bbox.cy}, 100, function() {
                this.group.animate({transform: 's1'}, 100);
            }.bind(this));
        }
    }

    onMouseLeave() {
        if (!this.isCross) {
            this.lines[0].animate({y: 10}, 100, function () {
                this.lines[0].animate({y: 7}, 100);
            }.bind(this));
            this.lines[2].animate({y: 20}, 100, function () {
                this.lines[2].animate({y: 23}, 100);
            }.bind(this));
        } else {
            let bbox = this.group.getBBox();
            this.group.animate({transform: 's.9,' + bbox.cx + ','+ bbox.cy}, 100, function() {
                this.group.animate({transform: 's1'}, 100);
            }.bind(this));
        }
    }

    closeMenu() {
        this.toButton();
        this.isCross = false;
    }

    openMenu() {
        this.toCross();
        this.isCross = true;
    }

    events() {
        this.button.removeEventListener('click', this.buttonClick);
        this.button.addEventListener('click', this.buttonClick);
        this.button.removeEventListener('mouseenter', this.mouseOver);
        this.button.addEventListener('mouseenter', this.mouseOver);
        this.button.removeEventListener('mouseleave', this.mouseLeave);
        this.button.addEventListener('mouseleave', this.mouseLeave);
    }

    drawSvg() {
        this.snap = new Snap('#' + this.SVG_ANIMATION_ID);
        this.svgInitialState();
    }

    toButton() {
        this.button.removeEventListener('click', this.buttonClick);
        let bbox0 = this.lines[0].getBBox();
        this.lines[0].animate({transform: 'r0,' + bbox0.cx + ',' + bbox0.cy}, 200);
        let bbox2 = this.lines[2].getBBox();
        this.lines[2].animate({transform: 'r0,' + bbox2.cx + ',' + bbox2.cy}, 200, function() {
            this.lines[1].attr({ display : "block" });
            this.lines[0].animate({y:7}, 100);
            this.lines[2].animate({y:23}, 100);
            this.button.addEventListener('click', this.buttonClick);
        }.bind(this));
    }

    toCross() {
        this.button.removeEventListener('click', this.buttonClick);
        this.lines[0].animate({y:15}, 100);
        this.lines[2].animate({y:15}, 100, function() {
            this.lines[1].attr({ display : 'none' });
            let bbox0 = this.lines[0].getBBox();
            this.lines[0].animate({transform: 'r45,' + bbox0.cx + ',' + bbox0.cy}, 200);
            let bbox2 = this.lines[2].getBBox();
            this.lines[2].animate({transform: 'r-45,' + bbox2.cx + ',' + bbox2.cy}, 200);
            this.button.addEventListener('click', this.buttonClick);
        }.bind(this));
    }

    svgInitialState() {
        this.lines = [
            this.snap.rect(0, 7, 30, 4, 1, 1),
            this.snap.rect(0, 15, 30, 4, 1, 1),
            this.snap.rect(0, 23, 30, 4, 1, 1)
        ];
        this.group = this.snap.group(
            this.lines[0],
            this.lines[1],
            this.lines[2]
        );
    }

    render() {
        return ([
            '<div id="' + this.constructor.getId() + '">',
            '<svg id="' + this.SVG_ANIMATION_ID + '"></svg>',
            '</div>'
        ]);
    }
}
