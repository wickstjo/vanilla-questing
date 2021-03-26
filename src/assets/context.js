import React, { createContext, useReducer } from "react";
import { reducer, values } from "../states/global";

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT PROVIDER
function Provider({ children }) {

    // ATTACH THE REDUCER
    const [state, dispatch] = useReducer(reducer, values)

    return (
        <Context.Provider value={{ state, dispatch }}>
            { children }
        </Context.Provider>
    )
}

export {
    Context,
    Provider
}