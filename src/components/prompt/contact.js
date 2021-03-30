import React, { Fragment } from 'react';

export default () => { return (
    <Fragment>
        <div id={ 'header' }>Contact Me</div>
        <div id={ 'contact' }>
            <div id={ 'container' }>
                <div className={ 'split' }>
                    <div>Email</div>
                    <div>wickstjo@gmail.com</div>
                </div>
                <div className={ 'split' }>
                    <div>Discord</div>
                    <div>strafir#9133</div>
                </div>
                <div className={ 'split' }>
                    <div>GitHub</div>
                    <div>
                        <Link
                            header={ 'wickstjo' }
                            url={ 'https://github.com/wickstjo' }
                        />
                    </div>
                </div>
                <div className={ 'split' }>
                    <div>PayPal</div>
                    <div>
                        <Link
                            header={ 'wickstjo@gmail.com' }
                            url={ 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LNLHSGMLKXL74&source=url' }
                        />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
)}

function Link({ header, url }) { return (
    <a href={ url } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
)}