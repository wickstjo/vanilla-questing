import React, { Fragment } from 'react';

import { extract } from '../../../funcs/quests';
import { resource } from '../../../funcs/settings';

import Single from '../single';
import Split from '../split';

export default ({ quest, state }) => { return (
    <Fragment>
        <span className={ 'starts-icon' } />
        <div className={ 'starts-row' }>
            <Row
                quest={ quest }
                state={ state }
            />
        </div>
    </Fragment>
)}

// QUEST ROW
function Row({ quest, state }) {

    // FETCH QUEST ID & NAME, THEN URL & LOCALIZATION PREFIX
    const { name, id } = extract(quest, state);
    const { url, prefix } = resource(state);

    // DETERMINE CONTAINER
    switch(typeof quest) {

        // ARRAYS
        case 'object': { return (
            <Split
                header={ name }
                tag={ quest[1] }
                url={ url }
                id={ id }
                prefix={ prefix }
            />
        )}

        // STRINGS
        default: { return (
            <Single
                header={ name }
                url={ url }
                id={ id }
                prefix={ prefix }
            />
        )}
    }
}