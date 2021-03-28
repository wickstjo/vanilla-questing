import React, { useState, useEffect } from 'react';

export default ({ selected, func, label }) => {

    // LOCAL STATE
    const [local, set_local] = useState({
        check: null
    })

    // TOGGLE SELECTED TAB
    useEffect(() => {
        set_local({
            check: selected ? 'current' : null
        })
    }, [selected])

    return (
        <div id="objectives" onClick={ func } className={ local.check }>
            { label }
        </div>
    )
}