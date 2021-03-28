import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from "../../assets/context";

export default () => {

    // GLOBAL CONTEXT
    const { state } = useContext(Context);

    // DEFAULT ENGLISH HEADERS
    const [ defaults ] = useState({
        refs: 'References',

        flightpath: 'Flightpath',
        hub: 'Quest Hub',
        interaction: 'Quest Interaction',
        objectives: 'Quest Objective',
        travel: 'Travel Point',

        return: 'Return quest',
        complete: 'Pick up & return quest',
        pickup: 'Pick up quest',
        objective: 'Complete objective',
        note: 'Authors note',

        chain: 'Part # of Chain',
        elite: 'Elite Quest',
        dungeon: 'Dungeon Quest',
        escort: 'Escort Quest',
        drop: 'Random Drop Starter'
    })

    // LOCAL STATE
    const [ headers, set_headers ] = useState(defaults)

    // TRANSLATE WHEN NECESSARY
    useEffect(() => {

        // IF SOMETHING OTHER THAN ENGLISH WAS SELECTED
        if (state.settings.language !== 'en') {

            // FETCH & SET NEW HEADERS
            const data = state.lang.terms[state.settings.language].references;
            set_headers(data);

        // OTHERWISE, RESET TO DEFAULTS
        } else { set_headers(defaults) }

    }, state.settings.language)

    return (
        <Fragment>
            <div id={ 'header' }>{ headers.refs }</div>
            <div id="references">
                <div className='container'>
                    <Color data={[ headers.return, 'green' ]} />
                    <Color data={[ headers.complete, 'purple' ]} />
                    <Color data={[ headers.pickup, 'yellow' ]} />
                    <Color data={[ headers.objective, 'red' ]} />
                    <Color data={[ headers.note, 'blue' ]} />
                </div>
                <div className='container'>
                    <Code data={[ headers.chain, 'P' ]} />
                    <Code data={[ headers.elite, 'E' ]} />
                    <Code data={[ headers.dungeon, 'D' ]} />
                    <Code data={[ headers.escort, 'F' ]} />
                    <Code data={[ headers.drop, 'R' ]} />
                </div>
            </div>
        </Fragment>
    )
}

// COLOR ROW
function Color({ data }) { return (
    <div className='row' id={ data[1] }>
        <span className={ data[1] + '-icon' } />
        { data[0] }
    </div>
)}

// MARKER ROW
function Marker({ data }) { return (
    <div className='row' id='brown' style={{ backgroundImage: `url(${ require('../../interface/images/waypoints/' + data[1] + '.png') })` }}>
        { data[0] }
    </div>
)}

// CODE ROW
function Code({ data }) { return (
    <div className='row' id='brown'>
        <div className='split'>
            <div>{ data[0] }</div>
            <div>{ data[1] }</div>
        </div>
    </div>
)}