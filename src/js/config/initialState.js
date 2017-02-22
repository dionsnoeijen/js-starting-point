'use strict';

export function initialState(location, callback) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', data => {
        callback(JSON.parse(data.currentTarget.response));
    });
    request.open('GET', location, true);
    request.send();
}
