import React, { useContext  } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import Specific from '../pages/specific';
import Random from '../pages/random';
import Error from '../pages/error';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF ROUTE & SETTINGS DATA HAS LOADED, RENDER PAGES NORMALLY
    if (state.settings !== null) { return (

        <Switch>
            <Route exact path={ '/' } component={ Random } />
            <Route exact path={ '/classic-questing/' } component={ Random } />
            <Route path={ '/classic-questing/:race/:block' } component={ Specific } />
            <Route component={ Error } />
        </Switch>

    // OTHERWISE, RENDER NOTHING
    )} else { return null; }
}