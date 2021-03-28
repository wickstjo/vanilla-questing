import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default ({ header, icon, func, link, url }) => {

    // HASHLINK
    if (link !== undefined) {
        return (
            <Hash
                link={ link }
                icon={ icon }
                header={ header }
            />
        )

    // NORMAL LINK
    } else if (url !== undefined) {
        return (
            <Link
                url={ url }
                icon={ icon }
                header={ header }
            />
        )

    // FUNC LINK
    } else {
        return (
            <Func
                func={ func }
                icon={ icon }
                header={ header }
            />
        )
    }
}

// LINK WITH FUNCTIONAL COMPONENT
function Func({ header, icon, func }) { return (
    <div className="item" onClick={ func }>
        <div className='icon' id={ icon } />
        <div className='header'>{ header }</div>
    </div>
)}

// HASH LINK
function Hash({ header, icon, link }) { return (
    <HashLink to={ link }>
        <div className="item">
            <div className='icon' id={ icon } />
            <div className='header'>{ header }</div>
        </div>
    </HashLink>
)}

// PLAIN OLD LINK
function Link({ header, icon, url }) { return (
    <a href={ url } target={ '_blank' } rel={ 'noopener noreferrer' }>
        <div className="item">
            <div className='icon' id={ icon } />
            <div className='header'>{ header }</div>
        </div>
    </a>
)}