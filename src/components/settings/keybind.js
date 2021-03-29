import React, { useContext, useState } from 'react';
import { Context } from "../../assets/context";
import { exists } from '../../funcs/settings';

import EventListener from 'react-event-listener';

export default ({ header, name, bind }) => {

    // GLOBAL STATE
    const { dispatch } = useContext(Context);

    const [local, set_local] = useState({
        key: bind,
        listener: false
    })

    // CHANGE COLOR & ACTIVATE KEY LISTENER
    const update = () => {
        set_local({
            ...local,
            listener: !local.listener
        })
    }

    // LISTEN FOR KEY PRESS
    const listener = (event) => {
        event.preventDefault();

        if (!exists(event.code)) {
            set_local({
                key: event.code,
                listener: false
            })
            dispatch({
                type: 'change-keybind',
                payload: {
                    name: name,
                    bind: event.code
                }
            })
        } else {
            dispatch({
                type: 'show-message',
                payload: {
                    type: 'bad',
                    value: 'Keybind already exists'
                }
            })
        }
    }

    return (
        <div>
            <div className={ 'keybind' } onClick={ update }>
                <div id={ 'title' }>{ header }</div>
                <div id={ local.listener ? 'current' : 'bind' }>{ local.key }</div>
            </div>
            { local.listener ? (
            <EventListener
                target={ document }
                onKeyDown={ listener }
            />
            ) : null }
        </div>
    )
}