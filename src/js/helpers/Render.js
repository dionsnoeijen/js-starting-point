'use strict';

export default class Render {

    static toScreen(html) {

        document.body.innerHTML += html.join('');
    }
}
