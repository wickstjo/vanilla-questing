import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Menu from './components/menu';
import Pages from './assets/pages';
import Prompt from './components/prompt';

export default () => {

    // WRAPPER STYLE STATE -- DEFAULT TO ACTIVE
    const [local, set_local] = useState('active');
    
    return (
        <BrowserRouter>
            <Provider>
                <Init />
                <div id={ 'wrapper' } className={ local }>
                    <Menu />
                    <Pages />
                </div>
                <Prompt set_wrapper={ set_local } />
            </Provider>
        </BrowserRouter>
    )
}