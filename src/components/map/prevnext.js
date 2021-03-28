import React, { useState, useEffect } from 'react';

export default ({ visibility, type, func, resolution }) => {

    // OPACITY STATE
    const [opacity, set_opacity] = useState({
        opacity: 0
    })

    // OPACITY STATE
    const [height, set_height] = useState({
        height: '0px'
    })

    // TOGGLE OPACITY
    useEffect(() => {
        set_opacity({
            opacity: visibility ? 1 : 0
        })
    }, [visibility])

    // CHANGE HEIGHT
    useEffect(() => {
        if (resolution !== null) {
            set_height({
                height: resolution.height + 'px'
            })
        }
    }, [resolution])

    return (
        <div
            id={ type }
            style={{ ...opacity, ...height }}
            onClick={ func }
        />
    )
}