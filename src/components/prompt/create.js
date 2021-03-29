import React, { useState, useContext, Fragment } from 'react';
import EventListener from 'react-event-listener';

import { Context } from "../../assets/context";
import { specific } from '../../funcs/build';
import { update_url } from '../../funcs/browsing';

export default () => {

    // ROUTE CONTEXT
    const { state, dispatch } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        level: '',
        button: 'bad'
    })

    // CHECK IF THE LEVEL REQUEST ABIDES BY THE RULESET
    const audit = (event) => {
        if (event.target.value.length !== 0 && event.target.value >= 0 && event.target.value <= 70) {
            set_local({
                level: event.target.value,
                button: 'good',
            })
        } else {
            set_local({
                level: event.target.value,
                button: 'bad',
            })
        }
    }

    // WHEN SUBMIT BUTTON IS PRESSED & NO ERRORS HAVE OCCURRED
    const submit = () => {
        if (local.button === 'good') {

            // LOAD BUILD
            const build = specific({
                race: state.request,
                block: 0
            })

            // FIND THE REQUESTED LEVEL
            for (let index = 0; index < build.data.route.length; index++) {
                const block = build.data.route[index];

                // FIND THE BLOCK WITH THE CLOSEST EXPERIENCE
                if (block.experience >= local.level) {
                    
                    // SET STARTING POINT IN BUILD
                    build.current = index;

                    // BREAK THE LOOP
                    break;
                }
            }

            // SET IT IN STATE
            dispatch({
                type: 'load-build',
                payload: build
            })

            // RESET LOCAL INPUT
            set_local({
                name: '',
                button: 'bad',
            })

            // UPDATE URL
            update_url(state, build.data.race, build.current)

            // HIDE PROMPT
            dispatch({ type: 'hide-prompt' })
        }
    }

    // ENTER KEY LISTENER
    const key_listener = (event) => {
        if (event.key.toLowerCase() === 'enter' && state.prompt.visible) {
            submit();
        }
    }

    return (
        <Fragment>
            <div id={ 'header' }>Starting Level</div>
            <div id={ 'create' }>
                <EventListener
                    target={ 'window' }
                    onKeyDown={ key_listener }
                />
                <input
                    id={ 'content' }
                    type={ 'text' }
                    placeholder={ '0-70' }
                    onChange={ audit }
                    value={ local.name }
                    autoFocus
                />
                <input
                    id={ local.button }
                    type={ 'submit' }
                    value={ 'Build' }
                    onClick={ submit }
                />
            </div>
        </Fragment>
    )
}