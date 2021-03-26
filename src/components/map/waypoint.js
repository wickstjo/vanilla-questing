import React, { useState, useEffect } from 'react';
import blank from '../../interface/images/waypoints/space.png';

export default ({ waypoint, block }) => {

    // LOCAL STATE
    const [local, set_local] = useState({
        alignment: null,
        number: null,
        position: {},
    })

    // GENERATE APPROPARIATE CONTENT
    useEffect(() => {

        // UPDATE LOCAL STATE
        set_local({
            alignment: (waypoint.align === undefined) ? 'left' : waypoint.align,
            number: block + 1,
            position: {
                left: waypoint.coords.x + '%',
                top: waypoint.coords.y + '%'
            }
        })

    }, [waypoint, block])

    return (
        <foreignObject>
            <div className={ 'waypoint' } style={ local.position }>
                <img
                    src={ blank }
                    id={ waypoint.type }
                    alt={ '' }
                />
                <span id={ local.alignment }>
                    <img
                        src={ blank }
                        id={ 'wp' + local.number }
                        alt={ '' }
                    />
                </span>
            </div>
        </foreignObject>
    )
}