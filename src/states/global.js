import { update_bind, update_prop } from "../funcs/settings";

// DEFUALT VALUES
const values = {

    // ROUTE RELATED
    data: null,
    current: 0,

    // REACT DOM URL API
    url: null,

    // SETTINGS RELATED
    settings: null,
    lang: {},

    // ROUTE REQUEST
    request: null,

    // PROMPT RELATED
    prompt: {
        visible: false,
        type: null
    }
}

// REDUCER
function reducer(state, { type, payload }) {
    switch (type) {

        // ON THE INITIAL PAGE LOAD
        case 'init': { return {
            ...state,
            settings: payload.settings,
            lang: payload.lang
        }}

        // LOAD BUILD REQUEST
        case 'load-build': { return {
            ...state,
            data: payload.data,
            current: payload.current
        }}

        // REACT DOM URL HISTORY API
        case 'url': { return {
            ...state,
            url: payload
        }}

        // CHANGE BLOCK
        case 'block': { return {
            ...state,
            current: payload
        }}

        // CREATE PROFILE PROMPT
        case 'create-prompt': { return {
            ...state,
            request: payload,
            prompt: {
                visible: true,
                type: 'create'
            }
        }}

        // SHOW SPECIFIC PROMPT
        case 'show-prompt': { return {
            ...state,
            prompt: {
                visible: true,
                type: payload
            }
        }}

        // HIDE PROMPT
        case 'hide-prompt': { return {
            ...state,
            prompt: {
                ...state.prompt,
                visible: false
            }
        }}

        // CHANGE KEYBIND
        case 'change-keybind': { return {
            ...state,
            settings: update_bind(state.settings, payload)
        }}

        // CHANGE SETTING
        case 'change-setting': { return {
            ...state,
            settings: update_prop(state.settings, payload)
        }}

        // FALLBACK
        default: {
            console.log('Context reducer type not found');
            return state;
        }
    }
}

export {
    values,
    reducer
}