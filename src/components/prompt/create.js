import React, { useState, useContext, Fragment } from 'react';
import EventListener from 'react-event-listener';

import { Context } from "../../assets/context";
import { specific } from '../../funcs/build';

export default () => {

    // ROUTE CONTEXT
    const { state, dispatch } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        name: '',
        button: 'bad',
        errors: []
    })

    // AUDIT NAME -- FORCE LOWERCASE
    const audit = (event) => {
        const input = event.target.value.toLowerCase();

        // ERRORS ARRAY
        let errors = [];

        // SOMETHING IS TYPED
        if (input.length !== 0) {

        // CHECK LENGTH
        if (input.length >= 3 && input.length <= 12) {

        // CHECK EXISTENCE
        if (!state.profiles.has(input)) {

        // IF NO ERRORS ARE FOUND, SAVE NAME TO STATE & CHANGE BUTTON COLOR
        set_local({
            name: input,
            button: 'good',
            errors: []
        })

        } else { errors.push('Name already exists!') }
        } else { errors.push('3-12 characters!') }
        } else { errors.push('Profile must have a name!') }

        // IF ERRORS WERE FOUND, SHOW THEM & TURN BUTTON RED
        if (errors.length !== 0) {
            set_local({
                name: input,
                button: 'bad',
                errors: errors
            })
        }
    }

    // WHEN SUBMIT BUTTON IS PRESSED & NO ERRORS HAVE OCCURRED
    const submit = () => {
        if (local.button === 'good') {

            // GENERATE DETAILS
            const details = {
                race: state.request,
                block: 0
            }

            // ADD PROFILE TO HASHMAP & LOAD THE BUILD
            state.profiles.set(local.name, details);
            const build = specific(details);

            // ADD PROFILE
            dispatch({
                type: 'add-profile',
                payload: {
                    data: build.data,
                    current: build.current,
                    profile: local.name,
                    profiles: state.profiles,
                    msg: 'profile "' + local.name + '" created'
                }
            })

            // RESET LOCAL STATE
            set_local({
                name: '',
                button: 'bad',
                errors: []
            })
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
            <div id={ 'header' }>Create Profile</div>
            <div id={ 'create' }>
                <EventListener
                    target={ 'window' }
                    onKeyDown={ key_listener }
                />
                <input
                    autoFocus
                    id={ 'content' }
                    type={ 'text' }
                    placeholder={ 'Enter Profile Name' }
                    onChange={ audit }
                    value={ local.name }
                />
                <input
                    id={ local.button }
                    type={ 'submit' }
                    value={ 'Create' }
                    onClick={ submit }
                />
            </div>
            <div id={ 'errors' }>
                <Errors data={ local.errors } />
            </div>
        </Fragment>
    )
}

// ERROR FRAME CONTENT
function Errors({ data }) {
    if (data.length !== 0) {
        return <span id={ 'row' }>{ data[0] }</span>
    } else {
        return null;
    }
}