import React, { useState, useEffect } from 'react';
import { sleep } from "../../funcs/misc";

export default ({ item }) => {

    // LOCAL STATE
    const [local, set_local] = useState({})

    // FADE IN AND OUT
    useEffect(() => {

        // GRADUALLY TURN ON OPACITY
        set_local({
            ...local,
            opacity: '1'
        })

        // WAIT 3 SECONDS
        sleep(3000).then(() => {

            // GRADUALLY TURN OFF OPACITY
            set_local({
                ...local,
                opacity: '0'
            })

            // WAIT FOR THE FADE TO END
            sleep(200).then(() => {

                // SHUT THE COMPONENT DOWN PROPERLY
                set_local({
                    ...local,
                    display: 'none'
                })

            })
        })
    }, [])

    return (
        <div id={ 'message' } className={ item.type } style={ local }>
            { item.text }
        </div>
    )
}