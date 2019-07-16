import React from 'react';
import { shorten } from '../../../funcs/misc';

function Quest({ quest, quests }) {

   // GENERATE ROW
   const row = () => {
      if (quest instanceof Array) {
         return <Multi
            header={ quest[0] }
            tag={ quest[1] }
            quests={ quests }
         />

      } else {
         return <Single
            header={ quest }
            quests={ quests }
         />
      }
   }

   return (
      <div className="quest">
         { row() }
      </div>
   )
}

// DEFAULT BLOCK
function Single(props) { return (
   <div><a href={ 'https://classicdb.ch/?quest=' + 1234 } target='_blank' rel='noopener noreferrer'>
      { shorten(props.header) }
   </a></div>
)}

// MULTI HEADER BLOCK
function Multi(props) { return (
   <div className="split">
      <div><a href={ 'https://classicdb.ch/?quest=' + 5678 } target='_blank' rel='noopener noreferrer'>
         { shorten(props.header) }
      </a></div>
      <div>{ props.tag }</div>
   </div>
)}

export default Quest;