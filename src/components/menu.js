import React, { useContext } from 'react';
import { Context } from '../assets/context';
import '../interface/css/menu.scss';

import Main from './menu/main';
import Create from './menu/create';

export default () => {

    // GLOBAL STATE
    const { dispatch } = useContext(Context);

    // TRIGGER PROMPT
    function prompt(type) {
        dispatch({
            type: 'show-prompt',
            payload: type
        })
    }

    return (
        <div id="menu">
            <div className="inner">
                <div>
                    <Main
                        header={ 'Randomize' }
                        type={ 'internal' }
                        resource={ '/classic-questing' }
                    />
                    <Create />
                    <Main
                        header={ 'Import Route' }
                        type={ 'trigger' }
                        resource={ () => prompt('import-route') }
                    />
                </div>
                <div>
                    <Main
                        header={ 'Help' }
                        type={ 'trigger' }
                        resource={ () => prompt('references') }
                    />
                    <Main
                        header={ 'Settings' }
                        type={ 'trigger' }
                        resource={ () => prompt('settings') }
                    />
                    <Main
                        header={ 'Contact' }
                        type={ 'trigger' }
                        resource={ () => prompt('contact') }
                    />
                    <Main
                        header={ 'GitHub' }
                        type={ 'external' }
                        resource={ 'https://github.com/wickstjo/vanilla-questing' }
                    />
                </div>
            </div>
        </div>
    )
}