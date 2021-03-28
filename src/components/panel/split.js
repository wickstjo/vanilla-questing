import React from 'react';

export default ({ header, url, id, prefix, tag }) => { return (
    <div className="split">
        <div><a href={ url + id } data-wowhead={ 'quest=' + id + '&domain=' + prefix + '.classic' } target={ '_blank' } rel='noopener noreferrer'>{ header }</a></div>
        <div>{ tag }</div>
    </div>
)}