import React, { useContext  } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import Manifesto from '../pages/manifesto';
import Settings from '../pages/settings';
import Error from '../pages/error';

import Specific from '../pages/specific';
import Random from '../pages/random';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF ROUTE & SETTINGS DATA HAS LOADED, RENDER PAGES NORMALLY
    if (state.settings !== null) { return (

        <Switch>
            <Route exact path={ '/vanilla-questing/' } component={ Random } />
            <Route path={ '/vanilla-questing/:race/:block' } component={ Specific } />
            <Route path={ '/vanilla-questing/manifesto' } component={ Manifesto } />
            <Route path={ '/vanilla-questing/settings' } component={ Settings } />
            <Route component={ Error } />
        </Switch>

    // OTHERWISE, RENDER NOTHING
    )} else { return null; }
}