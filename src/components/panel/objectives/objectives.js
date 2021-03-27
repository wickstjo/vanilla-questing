import React, { useContext, useState } from 'react';
import { Context } from "../../../assets/context";
import { show_circle, hide_circle } from "../../../funcs/map";
import Row from './row';

export default ({ visible }) => {

    // GLOBAL & LOCAL STATE
    const { state } = useContext(Context);
    const [ types ] = useState(['ends', 'completed', 'starts', 'objectives', 'special']);

    // DETERMINE CONTENT
    switch (visible) {

        // TAB VISIBLE, RENDER NORMALLY
        case true: { return (
            <div id="objectives">
                { state.data.route[state.current].waypoints.map((data, index) =>
                    <div className="section" key={ index } onMouseOver={() => { show_circle(index) } } onMouseOut={ hide_circle }>
                        <div className="title">
                            <div>{ index + 1 }. { data.header }</div>
                            <div>{ data.coords.x + '.' + data.coords.y }</div>
                        </div>
                        { types.map((type, index) =>
                            (data[type] !== undefined) ? <Row type={ type } data={ data[type] } key={ index } /> : null
                        )}
                    </div>
                )}
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}