import React, { useContext, useState } from 'react';
import { Context } from '../../assets/context';

export default ({ header, options }) => {

    // STATES
    const { state, dispatch } = useContext(Context);
    const [ local, set_local ] = useState(state.settings.language)

    // SWAP LANGUAGE
    function swap(item) {
        if (local !== item) {

            // SET LOCAL
            set_local(item)

            // CHANGE SETTING
            dispatch({
                type: 'change-setting',
                payload: {
                    prop: 'language',
                    value: item
                }
            })
        }
    }

    return (
        <div className={ 'option' }>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'language' }>
                { options.map((item, index) =>
                    <div id={ local === item ? 'current' : null } key={ index } onClick={() => { swap(item) }}>
                        { item }
                    </div>
                )}
            </div>
        </div>
    )
}