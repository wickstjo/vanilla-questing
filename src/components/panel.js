import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../assets/context";
import '../interface/css/panel.scss';

import Level from './panel/status/level';
import Progress from './panel/status/progress';
import Hearthstone from './panel/status/hearthstone';
import Tab from './panel/tab';
import Clipboard from './panel/clipboard';
import Objectives from './panel/objectives/objectives';
import Quests from './panel/questlog/quests';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        objectives: true,
        quests: false
    })

    // TAB HEADERS
    const [headers, set_headers] = useState({
        obj: 'Objectives',
        log: 'Quests'
    })

    // TOGGLE PANEL CONTENT
    function toggle() {
        set_local({
            objectives: !local.objectives,
            quests: !local.quests
        })
    }

    // TRANSLATE HEADERS
    useEffect(() => {
        if (state.settings.language !== 'en') {

            // FETCH & SET HEADERS
            set_headers({
                obj: state.lang.terms[state.settings.language].panel['objectives'],
                log: state.lang.terms[state.settings.language].panel['questlog']
            })
        }
    }, [state.settings.language])

    return (
        <div id={ 'panel' }>
            <div id={ 'status' }>
                <Level />
                <Progress />
                <Hearthstone />
                <div id={ 'panel-menu' } className={ 'split' }>
                    <Tab
                        label={ headers.obj }
                        func={ toggle }
                        selected={ local.objectives }
                    />
                    <Tab
                        label={ headers.log }
                        func={ toggle }
                        selected={ local.quests }
                    />
                    <Clipboard />
                </div>
            </div>
            <div id={ 'logs' }>
                <div id={ 'overflow-fix' }>
                    <Objectives visible={ local.objectives } />
                    <Quests visible={ local.quests } />
                </div>
            </div>
        </div>
    )
}