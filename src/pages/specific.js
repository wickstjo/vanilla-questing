import React, { useContext, useEffect } from 'react';
import { Context } from "../assets/context";
import '../interface/css/innerbody.scss';

import { key_listener } from '../funcs/browsing';
import { specific } from '../funcs/build';

import EventListener from 'react-event-listener';
import Map from '../components/map';
import Panel from '../components/panel';

export default ({ match }) => {

    // GLOBAL CONTEXT
    const { state, dispatch } = useContext(Context);

    // ON LOAD, GENERATE REQUESTED BUILD
    useEffect(() => {

        // FETCH THE BUILD
        const blob = specific(match.params)

        // SET IN STATE
        dispatch({
            type: 'load-request',
            payload: blob
        })
    }, [])

    // KEYBOARD EVENT LISTENER
    function key_event(event) {
        key_listener(event, state, dispatch)
    }

    // WHEN BUILT DATA HAS LOADED, RENDER PAGE
    if (state.data !== null) {

        return (
            <div id={ 'innerbody' }>
                <EventListener
                    target={ document }
                    onKeyDown={ key_event }
                />
                <div className={ 'inner' }>
                    <div id={ 'map-wrapper' }>
                        <Map />
                    </div>
                    <div id={ 'panel-wrapper' }>
                        <Panel />
                    </div>
                </div>
            </div>
        )

    // OTHERWISE, RENDER NOTHING
    } else { return null; }
}