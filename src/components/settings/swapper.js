import React, { useContext } from 'react';
import { Context } from "../../assets/context";

export default ({ header, first, second }) => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // SWAP SELECTED OPTION
    const swap = () => {
        dispatch({
            type: 'change-setting',
            payload: {
                prop: header,
                value: state.settings[header] === first ? second : first
            }
        })
    }

    return (
        <div className={ 'option' } onClick={ swap }>
            <div id={ 'title' }>{ header }</div>
            <div id={ 'swapper' }>
                <div id={ state.settings[header] === first ? 'current' : null }>{ first }</div>
                <div id={ state.settings[header] === second ? 'current' : null }>{ second }</div>
            </div>
        </div>
    )
}