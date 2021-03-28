import React, { useContext, Fragment } from 'react';
import { Context } from "../../assets/context";
import '../../interface/css/settings.scss';

import Swapper from '../settings/swapper';
import Keybind from '../settings/keybind';
import Language from '../settings/language';

export default () => {

    // GLOBAL CONTEXT
    const { state } = useContext(Context);
    
    return (
        <Fragment>
            <div id={ 'header' }>Settings</div>
            <div id={ 'settings' }>
                <div className={ 'container' }>
                    <Swapper
                        header={ 'keybinds' }
                        first={ 'enable' }
                        second={ 'disable' }
                    />
                    <Keybind
                        header={ 'close prompts' }
                        name={ 'close' }
                        bind={ state.settings.binds.close }
                    />
                    <Keybind
                        header={ 'open references' }
                        name={ 'references' }
                        bind={ state.settings.binds.references }
                    />
                    <Keybind
                        header={ 'browse backward' }
                        name={ 'backward' }
                        bind={ state.settings.binds.backward }
                    />
                    <Keybind
                        header={ 'browse forward' }
                        name={ 'forward' }
                        bind={ state.settings.binds.forward }
                    />
                </div>
                <div className={ 'container' }>
                    <Swapper
                        header={ 'database' }
                        first={ 'classicdb' }
                        second={ 'wowhead' }
                    />
                </div>
                <div className={ 'container' }>
                    <Language
                        header={ 'Language' }
                        options={[
                            'en',
                            'ru',
                            'ge',
                            'fr',
                            'sp',
                            'kr',
                            'cn'
                        ]}
                    />
                </div>
            </div>
        </Fragment>
    )
}