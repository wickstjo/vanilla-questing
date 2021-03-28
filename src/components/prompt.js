import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../assets/context";
import '../interface/css/prompt.scss';

import ImportRoute from './prompt/import_route';
import Create from './prompt/create';
import References from './prompt/references';
import Contact from './prompt/contact';
import Settings from './prompt/settings';

export default ({ set_wrapper }) => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // LOCAL STYLE STATE -- DEFAULT TO INACTIVE
    const [local, set_local] = useState('inactive');

    // TOGGLE VISIBILITY BASED ON STATE
    useEffect(() => {
        
        // WRAPPER & PROMPT STATUSES
        const wrapper_status = state.prompt.visible ? 'inactive' : 'active'
        const prompt_status = state.prompt.visible ? 'active' : 'inactive'

        // CHANGE SELECTOR CLASSES
        set_local(prompt_status)
        set_wrapper(wrapper_status)

    }, [state.prompt.visible])

    return (
        <div id={ 'prompt' } className={ local }>
            <div id={ 'inner' } className={ local }>
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

        // CONTACT
        case 'contact': {
            return <Contact />
        }

        // SETTINGS
        case 'settings': {
            return <Settings />
        }

        // FALLBACK
        default: {
            return <div>Prompt type error</div>
        }
    }
}