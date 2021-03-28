import React, { useState } from 'react';

export default ({ children, header, type, resource }) => {

    // LOCAL STATE
    const [style, set_style] = useState({
        display: 'none',
        top: 0,
        left: 0
    })

    // SHOW SUBMENU
    function showSubmenu(event) {

        // DEFAULT TO LEFT ALIGNING
        let position = event.target.offsetLeft;

        // IF THERE ISNT ENOUGH SPACE, RIGHT ALIGN
        if ((event.target.offsetLeft + 220) > window.innerWidth) {
            position = window.innerWidth - 220;
        }

        // CHANGE STYLE
        set_style({
            display: 'block',
            left: position,
            top: event.target.offsetHeight
        })
    }

    // HIDE SUBMENU
    function hideSubmenu() {
        set_style({
            display: 'none',
            top: 0,
            left: 0
        })
    }

    if (children === undefined) {
        return (
            <Single
                header={ header }
                type={ type }
                resource={ resource }
            />
        )

    // WITH SUBMENU
    } else {
        return (
            <Multi
                showSubmenu={ showSubmenu }
                hideSubmenu={ hideSubmenu }
                header={ header }
                style={ style }
                children={ children }
            />
        )
    }
}

// STANDALONE LINK
function Single({ header, type, resource }) {
    switch(type) {

        // EXTERNAL LINK
        case 'link': { return (
            <a href={ resource } target={ '_blank' } rel={ 'noopener noreferrer' }>
                <li>{ header }</li>
            </a>
        )}

        // FUNC TRIGGER
        case 'trigger': { return (
            <li onClick={ resource }>{ header }</li>
        )}

        // FALLBACK
        default: {
            console.log('MENU LINK SWITCH ERROR')
            return null;
        }
    }
}

// LINK WITH SUBMENU
function Multi({ showSubmenu, hideSubmenu, header, style, children }) { return (
    <li className='more' onMouseEnter={ showSubmenu } onMouseLeave={ hideSubmenu }>
        { header }
        <div id="submenu" style={ style }>
            { children }
        </div>
    </li>
)}