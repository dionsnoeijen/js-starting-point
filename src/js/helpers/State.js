'use strict';

let actions = [];
let observe = [];

// Create the initial state
let state = {
    navigationInitialized: false,
    languageNavigationInitialized: false
};

export function addObservable(observeMe) {
    observe.push(observeMe);
}

export function dispatch(addState) {
    console.log(addState);
    actions.push(addState);
    let action = actions[actions.length - 1];
    if (action.data !== undefined) {
        updateState(action.data);
    }
    if (action.listener !== undefined) {
        observe.map(observable => {
            if (observable[action.listener]) {
                observable[action.listener](action.data !== undefined ? action.data : null);
            }
        });
    }
}

function updateState(newState) {
    state = Object.assign(state, newState);
}

export function getState() {
    return state;
}