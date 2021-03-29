// BROWSE TO PREVIOUS BLOCK
function previous(state, dispatch) {
    const prev = state.current - 1;

    // IF THERE IS ROOM TO MOVE
    if (prev >= 0) {
        dispatch({
            type: 'block',
            payload: prev
        })

        // UPDATE REACT DOM URL
        update_url(state, state.data.race, prev)
    }
}

// BROWSE TO NEXT BLOCK
function next(state, dispatch) {
    const next = state.current + 1;

    // IF THERE IS ROOM TO MOVE
    if (next <= state.data.route.length - 1) {
        dispatch({
            type: 'block',
            payload: next
        })

        // UPDATE REACT DOM URL
        update_url(state, state.data.race, next)
    }
}

// JUMP IN PROGRESS
function jump(event, state, dispatch) {

    // EVENT PARAMS
    const parameters = {
        window: window.innerWidth,
        width: event.target.clientWidth,
        coord: event.pageX + 7
    }

    // FIND CLOSEST ROUTE BLOCK
    const length = parameters.width - (parameters.window - parameters.coord);
    const percent = length / parameters.width;
    const final = Math.floor(percent * state.data.route.length);

    // UPDATE STATE
    dispatch({
        type: 'block',
        payload: final
    })

    // UPDATE REACT DOM URL
    update_url(state, state.data.race, final)
}

// UPDATE URL VIA REACT DOM
function update_url(state, race, block) {
    state.url.replace('/classic-questing/' + race + '/' + block)
}

// BROWSING KEY LISTENER
function key_listener(event, state, dispatch) {

    // IF KEYBINDS ARE ENABLED, EXECUTE REQUEST
    if (state.settings.keybinds === 'enable') {
        switch (event.code) {

            // PREVIOUS BLOCK
            case state.settings.binds.backward:
                if (!state.prompt.visible) {
                    previous(state, dispatch);
                }
            break;

            // NEXT BLOCK
            case state.settings.binds.forward:
                if (!state.prompt.visible) {
                    next(state, dispatch);
                }
            break;

            // SHOW REFERENCES
            case state.settings.binds.references:
                if (!state.prompt.visible) {
                    dispatch({
                        type: 'show-prompt',
                        payload: 'references'
                    })
                }
            break;

            // CLOSE PROMPT
            case state.settings.binds.close:
                dispatch({
                    type: 'hide-prompt',
                })
            break;

            // FALLBACK
            default:
                return null;
        }
    }
}

export {
    next,
    previous,
    jump,
    update_url,
    key_listener
}