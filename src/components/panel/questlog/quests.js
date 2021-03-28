import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../assets/context";
import { filter } from "../../../funcs/quests";
import Quest from './quest';

export default ({ visible }) => {

    // GLOBAL & LOCAL STATE
    const { state } = useContext(Context);
    const [ header, set_header ] = useState('Current Quests');

    // TRANSLATE HEADER
    useEffect(() => {
        if (state.settings.language !== 'en') {

            // FETCH & SET NEW NAME
            const name = state.lang.terms[state.settings.language].panel['current'];
            set_header(name);
        }
    }, [state.settings.language])

    // DETERMINE CONTENT
    switch (visible) {

        // TAB IS VISIBLE, RENDER NORMALLY
        case true: {

            // FILTER PROGRESS
            const content = filter(state);

            return (
                <div id={ 'quests' }>
                    <div className={ 'section' }>
                        <div className={ 'title' }>
                            <div>{ header }</div>
                            <div>{ content.length } / 20</div>
                        </div>
                        { content.map((quest, index) =>
                            <Quest
                                key={ index }
                                quest={ quest }
                                state={ state }
                            />
                        )}
                    </div>
                </div>
            )
        }

        // OTHERWISE, RENDER NOTHING
        default: { return null; }
    }
}