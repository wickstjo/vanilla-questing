import React from 'react';

export default ({ header, url, id, prefix }) => {
    switch(id) {

        // PLAIN LINKS
        case undefined: { return (
            <div>
                <a href={ url } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
            </div>
        )}

        // DATABASE LINKS
        default: { return (
            <div>
                <a href={ url + id } data-wowhead={ 'quest=' + id + '&domain=' + prefix + '.classic' } target={ '_blank' } rel={ 'noopener noreferrer' }>{ header }</a>
            </div>
        )}
    }
}