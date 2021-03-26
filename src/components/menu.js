import React from 'react';
import '../interface/css/menu.scss';

import Main from './menu/main';
import Help from './menu/help';
import Storage from './menu/storage';
import Actions from './menu/actions';
import Profiles from './menu/profiles';
import Create from './menu/create';

export default () => { return (
    <div id="menu"><div className="inner">
        <div>
            <Main header={ 'Route' } link={ '/vanilla-questing/' } />
            <Main header={ 'Manifesto' } link={ '/vanilla-questing/manifesto' } />
            <Help />
            <Main header={ 'Settings' } link={ '/vanilla-questing/settings' } />
        </div>
        <div>
            <Storage />
            <Actions />
            <Profiles />
            <Create />
        </div>
    </div></div>
)}