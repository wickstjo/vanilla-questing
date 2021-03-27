import React, { Fragment } from 'react';

export default ({ current, next, offcolor }) => {

    // IF THERE IS A PREDICESSOR
    if (next !== undefined) {

        return (
            <Fragment>
                <line
                    x1={ current.coords.x + '%' }
                    y1={ current.coords.y + '%' }
                    x2={ next.coords.x + '%' }
                    y2={ next.coords.y + '%' }
                    id={ offcolor ? 'secondary-outer' : 'primary-outer' }
                />
                <line
                    x1={ current.coords.x + '%' }
                    y1={ current.coords.y + '%' }
                    x2={ next.coords.x + '%' }
                    y2={ next.coords.y + '%' }
                    id={ offcolor ? 'secondary-inner' : 'primary-inner' }
                />
            </Fragment>
        )

    // OTHERWISE, RETURN NULL
    } else { return null; }
}