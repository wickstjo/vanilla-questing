import { update_bind, update_prop } from "../funcs/settings";

// DEFUALT VALUES
const values = {

    // ROUTE RELATED
    data: null,
    current: 0,

    // REACT DOM URL API
    url: null,

    // MISC
    settings: null,
    request: null,
    loaded: null,

    // PROMPT RELATED
    prompt: {
        visible: false,
        type: null
    },

    // LANGUAGE
    lang: {}
}

// REDUCER
function reducer(state, { type, payload }) {
    switch (type) {

        // ON THE INITIAL PAGE LOAD
        case 'init': { return {
            ...state,
            settings: payload.settings,
            lang: payload.lang,
            prompt: {
                ...state.prompt,
                visible: false
            }
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

        // IMPORT ROUTE
        case 'import-route': { return {
            ...state,
            data: payload.data,
            current: payload.current,
            loaded: null,
            prompt: {
                ...state.prompt,
                visible: false
            },
            messages: [
                ...state.messages, {
                    text: payload.msg,
                    type: 'good'
                }
            ]
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