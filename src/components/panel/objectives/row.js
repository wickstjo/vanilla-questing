import React, { useContext, Fragment } from 'react';
import { Context } from "../../../assets/context";

import { extract } from '../../../funcs/quests';
import { resource } from '../../../funcs/settings';

import Single from '../single';
import Split from '../split';

export default ({ data, type }) => {
    return data.map((quest, index) =>
        <Fragment key={ index }>
            <span className={ type + '-icon' } />
            <div className={ type + '-row' }>
                <Name
                    data={ quest }
                    type={ type }
                />
            </div>
        </Fragment>
    )
}

// QUEST NAME SELECTOR
function Name({ data, type }) {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // NON SPECIALS
    if (type !== 'special') {

        // FETCH QUEST ID & NAME, THEN URL & LOCALIZATION PREFIX
        const { name, id } = extract(data, state);
        const { url, prefix } = resource(state);

        // DETERMINE CONTAINER
        switch(typeof data) {

            // ARRAY
            case 'object': { return (
                <Split
                    header={ name }
                    tag={ data[1] }
                    url={ url }
                    id={ id }
                    prefix={ prefix }
                />
            )}

            // STRING
            default: { return (
                <Single
                    header={ name }
                    url={ url }
                    id={ id }
                    prefix={ prefix }
                />
            )}
        }

    // SPECIALS
    } else {
        switch(typeof data) {

            // ARRAY
            case 'object': { return (
                <Single
                    header={ data[0] }
                    url={ data[1] }
                />
            )}

            // STRING
            default: {
                return <div>{ data }</div>
            }
        }
    }
}