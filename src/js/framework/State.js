'use strict';

// Create the initial state
export let state = {};
export let actions = [];
export let observe = [];

export function addObservable(observeMe) {
    observe.push(observeMe);
}

export function dispatch(addState) {
    actions.push(addState);
    let action = actions[actions.length - 1];
    if (action.data !== undefined) {
        updateState(action.data);
    }

    if (action.listener !== undefined) {
        if (Array.isArray(action.listener)) {
            executeMultiple(action);
            return;
        }
        executeSingle(action);
    }
}

function executeMultiple(action) {
    observe.map(observable => {
        for (let key in action.listener) {
            if (action.listener.hasOwnProperty(key)) {
                if (observable[action.listener[key]]) {
                    execute(
                        observable,
                        action.listener[key],
                        action.data !== undefined ? action.data : null
                    );
                }
            }
        }
    });
}

function executeSingle(action) {
    observe.map(observable => {
        if (observable[action.listener]) {
            execute(
                observable,
                action.listener,
                action.data !== undefined ? action.data : null
            );
        }
    });
}

function execute(instance, func, params) {
    instance[func](params);
}

function updateState(newState) {
    state = Object.assign(state, newState);
}

export function getState(key) {
    if (key === undefined) {
        return state;
    }
    return state[key];
}
