import React, { Fragment } from 'react';
import { _export } from '../../funcs/storage';

export default () => { return (
    <Fragment>
        <div id={ 'header' }>Export Profiles</div>
        <div id={ 'export' }>
            <textarea
                value={ _export() }
                readOnly
            />
        </div>
    </Fragment>
)}