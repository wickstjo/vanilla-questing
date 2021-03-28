import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../assets/context";
import { jump } from "../../../funcs/browsing";

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // LOCAL PROGRESS STATE
    const [local, set_local] = useState({
        progress: null,
        width: {}
    })

    // LOCAL HEADER
    const [header, set_header] = useState('Progress');

    // RECALIBRATE PROGRESS
    useEffect(() => {

        // FIND PERCENTAGE
        const current = ((state.current / (state.data.route.length - 1)) * 100).toFixed(2) + '%';

        // UPDATE LOCAL STATE
        set_local({
            progress: current,
            width: {
                width: current
            }
        })

    }, [state.current, state.data])

    // TRANSLATE HEADER
    useEffect(() => {
        if (state.settings.language !== 'en') {

            // FETCH & SET NEW NAME
            const name = state.lang.terms[state.settings.language].panel['progress'];
            set_header(name);
        }
    }, [state.settings.language])

    return (
        <div id="progress" onClick={(event) => { jump(event, state, dispatch) }}>
            <div className="split">
                <div>{ header }</div>
                <div>{ local.progress }</div>
                <div id="bar" style={ local.width } />
            </div>
        </div>
    )
}