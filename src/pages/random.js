import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { options } from '../funcs/build';

export default () => {

    // LOCAL STATE
    const [local, set_local] = useState({
        race: null,
        block: null
    })

    // ON LOAD..
    useEffect(() => {

        // SELECT A RANDOM RACE
        const race = Math.floor((Math.random() * options.length) + 0);

        // SELECT A RANDOM BLOCK
        const block = Math.floor((Math.random() * 250) + 0);

        // REDIRECT TO GENERATED PAGE
        set_local({
            race: options[race],
            block: block
        })
    }, [])

    // IF A RANDOM RACE HAS BEEN SELECTED, REDIRECT
    if (local.race !== null) {

        return (
            <Redirect to={ '/classic-questing/' + local.race + '/' + local.block } />
        )

    // OTHERWISE, RENDER NOTHING
    } else { return null; }
}