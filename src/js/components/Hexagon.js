'use strict';

export default class Hexagon {

    static getId() {
        return 'hexagon';
    }

    static render(id) {
        return ([
            '<svg id="' + this.getId() + '-' + id + '"></svg>'
        ]);
    }
}
