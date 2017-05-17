'use strict';

export default class HomeColorLayer {

    static getId() {
        return 'home-color-layer';
    }

    render() {
        return ([
            '<div id="' + this.constructor.getId() + '"></div>'
        ]);
    }
}
