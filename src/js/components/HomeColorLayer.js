'use strict';

import Snap from 'snapsvg';
import { addObservable } from '../framework/State';
import { ON_RENDERED } from '../config/actions';
import Container from '../framework/Container';

export default class HomeColorLayer {

    constructor(screen, renderId) {
        addObservable(this);
        this.screen = screen;
        this.renderId = renderId;
        this.screen.addEventListener('resize', this.onScreenResize.bind(this));
    }

    static getId() {
        return 'home-color-layer';
    }

    [ON_RENDERED](data) {
        this.currentPage = data.component.constructor.getId();
        if (this.currentPage === this.renderId) {
            this.shapes = [];
            if (this.snap !== undefined) {
                delete this.snap;
            }
            this.snap = new Snap('#' + this.constructor.getId());
            this.drawSvg();
        }
    }

    onScreenResize() {
        if (this.currentPage === this.renderId) {
            this.drawSvg();
        }
    }

    drawSvg() {
        let top = Container.getService('home_hexagon_helper').getTop();
        let polygonWidth = Container.getService('home_hexagon_helper').getPolygonWidth();
        let polygonPositions = Container.getService('home_hexagon_helper').polygonPositions();
        let linePositions = Container.getService('home_hexagon_helper').linePositions();

        if (this.shapes[0] === undefined) {
            this.shapes.push(this.snap.paper.rect(0, 0, this.screen.getSize().x, 50));
        } else {
            this.shapes[0].attr({width: this.screen.getSize().x});
        }

        let path1 = Snap.format(
            'M{x} {y}' +
            'L{p1.x} {p1.y}' +
            'L{p2.x} {p2.y}' +
            'L{p3.x} {p3.y}' +
            'L{p4.x} {p4.y}' +
            'L{p5.x} {p5.y}' +
            'L{p6.x} {p6.y}' +
            'L{p7.x} {p7.y}' +
            'L{p8.x} {p8.y}' +
            'L{p9.x} {p9.y}' +
            'L{p10.x} {p10.y}' +
            'L{p11.x} {p11.y}' +
            'L{p12.x} {p12.y}' +
            'L{p13.x} {p13.y}' +
            'L{p14.x} {p14.y}' +
            'L{p15.x} {p15.y}' +
            'L{p16.x} {p16.y}' +
            'L{p17.x} {p17.y}'
            , {
                x: polygonPositions[3].x + 50, y: top,
                p1: {x: this.screen.getSize().x, y: top},
                p2: {x: this.screen.getSize().x, y: this.screen.getSize().y},
                p3: {x: polygonPositions[20].x + 18, y: this.screen.getSize().y},
                p4: {x: polygonPositions[20].x + 50, y: linePositions[7].y1},
                p5: {x: polygonPositions[16].x + polygonWidth - 50, y: linePositions[7].y1},
                p6: {x: polygonPositions[16].x + polygonWidth, y: linePositions[6].y1},
                p7: {x: polygonPositions[16].x + polygonWidth - 50, y: linePositions[5].y1},
                p8: {x: polygonPositions[12].x + 50, y: linePositions[5].y1},
                p9: {x: polygonPositions[12].x, y: linePositions[4].y1},
                p10: {x: polygonPositions[12].x + 50, y: linePositions[3].y1},
                p11: {x: polygonPositions[8].x + polygonWidth - 50, y: linePositions[3].y1},
                p12: {x: polygonPositions[8].x + polygonWidth, y: linePositions[2].y1},
                p13: {x: polygonPositions[8].x + polygonWidth - 50, y: linePositions[1].y1},
                p14: {x: polygonPositions[8].x + polygonWidth - 50, y: linePositions[1].y1},
                p15: {x: polygonPositions[4].x + polygonWidth - 50, y: linePositions[1].y1},
                p16: {x: polygonPositions[4].x + polygonWidth, y: linePositions[0].y1},
                p17: {x: polygonPositions[3].x, y: linePositions[0].y1}
            });
        if (this.shapes[1] === undefined) {
            this.shapes.push(this.snap.path(path1));
        } else {
            this.shapes[1].attr({d: path1});
        }

        if (this.shapes[2] === undefined) {
            let path2 = Snap.format(
                'M{x} {y}' +
                'L{p1.x} {p1.y}' +
                'L{p2.x} {p2.y}' +
                'L{p3.x} {p3.y}' +
                'L{p4.x} {p4.y}' +
                'L{p5.x} {p5.y}' +
                'L{p6.x} {p6.y}' +
                'L{p7.x} {p7.y}' +
                'L{p8.x} {p8.y}' +
                'L{p9.x} {p9.y}' +
                'L{p10.x} {p10.y}'
                , {
                    x: 0, y: linePositions[3].y1,
                    p1: {x: polygonPositions[9].x + polygonWidth - 50, y: linePositions[3].y1},
                    p2: {x: polygonPositions[9].x + polygonWidth, y: linePositions[4].y1},
                    p3: {x: polygonPositions[9].x + polygonWidth - 50, y: linePositions[5].y1},
                    p4: {x: polygonPositions[14].x + polygonWidth - 50, y: linePositions[5].y1},
                    p5: {x: polygonPositions[14].x + polygonWidth, y: linePositions[6].y1},
                    p6: {x: polygonPositions[14].x + polygonWidth - 50, y: linePositions[7].y1},
                    p7: {x: polygonPositions[19].x + 50, y: linePositions[7].y1},
                    p8: {x: polygonPositions[19].x, y: linePositions[8].y1},
                    p9: {x: 0, y: this.screen.getSize().y},
                    p10: {x: 0, y: linePositions[3].y1}
                }
            );
            this.shapes.push(this.snap.path(path2));
        }
    }

    animateIn() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('out');
        element.classList.add('in');
    }

    animateOut() {
        let element = document.querySelector('#' + this.constructor.getId());
        element.classList.remove('in');
        element.classList.add('out');
    }

    render() {
        return ([
            '<svg id="' + this.constructor.getId() + '"></svg>'
        ]);
    }
}
