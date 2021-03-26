import React, { useContext  } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import Home from '../pages/home';
import Manifesto from '../pages/manifesto';
import Target from '../pages/target';
import Settings from '../pages/settings';
import Error from '../pages/error';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF ROUTE & SETTINGS DATA HAS LOADED, RENDER PAGES NORMALLY
    if (state.data !== null && state.settings !== null) { return (

        <Switch>
            <Route exact path={ '/vanilla-questing/' } component={ Home } />
            <Route path={ '/vanilla-questing/manifesto' } component={ Manifesto } />
            <Route path={ '/vanilla-questing/:race/:block' } component={ Target } />
            <Route path={ '/vanilla-questing/settings' } component={ Settings } />
            <Route component={ Error } />
        </Switch>

    // OTHERWISE, RENDER NOTHING
    )} else { return null; }
}