import React, { useContext, useEffect } from 'react';
import { Context } from "../assets/context";
import { sleep } from "../funcs/misc";
import '../interface/css/prompt.scss';

import ImportRoute from './prompt/import_route';
import Create from './prompt/create';
import References from './prompt/references';
import Export from './prompt/export';
import ImportProfiles from './prompt/import_profiles';

// PROMPT CONTAINER
export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // TOGGLE VISIBILITY BASED ON STATE
    useEffect(() => {
        if (state.prompt.visible) {
            document.getElementById('prompt').style.display = 'flex';
            sleep(100).then(() => {
                document.getElementById('prompt').style.opacity = 1;
            });
        } else {
            document.getElementById('prompt').style.opacity = 0;
            sleep(100).then(() => {
                document.getElementById('prompt').style.display = 'none';
            });
        }
    }, [state.prompt.visible]);

    return (
        <div id={ 'prompt' }>
            <div id={ 'inner' }>
                <Content type={ state.prompt.type } />
                <span id="close" onClick={() => { dispatch({ type: 'hide-prompt' }) }} />
            </div>
        </div>
    )
}

// PROMPT CONTENT
function Content({ type }) {
    switch(type) {

        // LOADING
        case 'loading': {
            return <div className="lds-dual-ring" />
        }

        // IMPORT ROUTE
        case 'import-route': {
            return <ImportRoute />
        }

        // CREATE PROFILE
        case 'create': {
            return <Create />
        }

        // REFERENCES
        case 'references': {
            return <References />
        }

        // EXPORT PROFILES
        case 'export': {
            return <Export />
        }

        // IMPORT ROUTE
        case 'import-profiles': {
            return <ImportProfiles />
        }

        // FALLBACK
        default: {
            return <div>Prompt type error</div>
        }
    }
}