import React, { useState, useContext, Fragment } from 'react';
import { Context } from "../../assets/context";
import { custom } from '../../funcs/build';
import axios from 'axios';

export default () => {

    // GLOBAL CONTEXT
    const { dispatch } = useContext(Context);

    // PICKED FACTION STATE
    const [local, set_local] = useState({
        alliance: true,
        horde: false
    })

    // TOGGLE FACTION
    function toggle(target) {
        if (!target) {
            set_local({
                alliance: !local.alliance,
                horde: !local.horde,
            })
        }
    }

    // PARSE SELECTED FILE
    function parse_file(event) {
        event.persist();

        // FIND THE FILE
        var content = event.target.files[0];

        // INSTANTIATE THE READER
        var reader = new FileReader();

        // GENERATE A FETCHABLE URL, THEM FETCH IT
        reader.onload = () => {
            axios.get(reader.result).then(response => {

                // CHECK CONTENT TYPE
                const type = typeof response.data;

                // IF ITS A PROPERLY FORMATTED OBJECT
                if (type !== 'string' && Object.keys(response.data).length) {

                    // GENERATE BUILD
                    const build = custom({
                        build: response.data,
                        faction: local.alliance ? 'alliance' : 'horde'
                    })

                    // IMPORT THE ROUTE
                    dispatch({
                        type: 'import-route',
                        payload: {
                            data: build.data,
                            current: build.current,
                            msg: 'ROUTE IMPORTED SUCCESSFULLY'
                        }
                    })

                // OTHERWISE, LOADING NOTHING & SHOW ERROR MESSAGE
                } else {

                    // HIDE PROMPT
                    dispatch({ type: 'hide-prompt' });

                    // SHOW MESSAGE
                    dispatch({
                        type: 'add-message',
                        payload: {
                            msg: 'YOUR FILE CONTAINS ERRORS',
                            type: 'bad'
                        }
                    })
                }

                // IRREGARDLESS, CLEAR THE INPUT FIELD
                event.target.value = null;
            })
        }

        // TRIGGER THE READER
        reader.readAsDataURL(content);
    }

    // TOGGLE FACTION
    function picker(faction) {
        if (faction) { return 'selected'; }
    }

    return (
        <Fragment>
            <div id={ 'header' }>Import Route</div>
            <div id={ 'import' }>
                <div id={ 'factions' }>
                    <div className={ 'tab' } id={ picker(local.alliance) } onClick={() => { toggle(local.alliance) }}>Alliance</div>
                    <div className={ 'tab' } id={ picker(local.horde) } onClick={() => { toggle(local.horde) }}>Horde</div>
                </div>
                <div id={ 'container' }>
                    <input
                        id={ 'route' }
                        type={ 'file' }
                        onChange={ parse_file }
                    />
                    <div id={ 'label' }>Select or Drop a route File</div>
                </div>
            </div>
        </Fragment>
    )
}