import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../assets/context";
import '../interface/css/map.scss';

import EventListener from 'react-event-listener';
import { dimensions } from "../funcs/map";
import { next, previous } from "../funcs/browsing";
import { sleep } from "../funcs/misc";

import PrevNext from './map/prevnext';
import Container from './map/container';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        prevnext: false,
        resolution: null
    })

    // SHOW/HIDE PREVNEXT PANELS
    const prevnext = {
        show: function() {
            set_local({
                ...local,
                prevnext: true
            })
        },
        hide: function() {
            set_local({
                ...local,
                prevnext: false
            })
        }
    }

    // UPDATE RESOLUTION
    function update_resolution() {
        set_local({
            ...local,
            resolution: dimensions()
        })
    }

    // ON INITIAL LOAD
    useEffect(() => {
        sleep(200).then(() => {

            // WAIT FOR MAP SELECTOR RESOLUTION TO SETTLE, THEN MEASURE SELECTOR
            update_resolution();

            // WAIT ANOTHER MILLISECOND, THEN TRANSITION OPACITY
            sleep(100).then(() => {
                document.getElementById("map").style.opacity = 1;
            })
        })
    }, [])

    return (
        <div onMouseOver={ prevnext.show } onMouseOut={ prevnext.hide }>
            <EventListener
                target={ 'window' }
                onResize={ update_resolution }
            />
            <Container
                resolution={ local.resolution }
            />
            <PrevNext
                type={ 'prev' }
                visibility={ local.prevnext }
                func={() => { previous(state, dispatch) }}
                resolution={ local.resolution }
            />
            <PrevNext
                type={ 'next' }
                visibility={ local.prevnext }
                func={() => { next(state, dispatch) }}
                resolution={ local.resolution }
            />
        </div>
    )
}