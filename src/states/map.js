// DEFAULT VALUES
const values = {
    background: {},
    markers: [],
    position: {},
    transition: {},
    movement: {
        last_position: {},
        last_event: {},
        enabled: false
    }
}

// REDUCER
function reducer(state, action) {
    switch (action.type) {

        // UPDATE MARKERS
        case 'markers': { return {
            ...state,
            markers: action.payload
        }}

        // UPDATE POSITION
        case 'position': { return {
            ...state,
            position: action.payload.coords,
            movement: {
                ...state.movement,
                last_position: action.payload.position
            }
        }}

        // ENABLE MOVEMENT
        case 'enable-movement': { return {
            ...state,
            transition: {
                transition: 'none'
            },
            movement: {
                ...state.movement,
                enabled: true,
                last_event: action.payload
            }
        }}

        // DISABLE MOVEMENT
        case 'disable-movement': { return {
            ...state,
            transition: {
                transition: '0.2s'
            },
            movement: {
                ...state.movement,
                enabled: false
            }
        }}

        // MOVING
        case 'move': { return {
            ...state,
            position: action.payload.coords,
            movement: {
                ...state.movement,
                last_event: action.payload.event,
                last_position: action.payload.position
            }
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