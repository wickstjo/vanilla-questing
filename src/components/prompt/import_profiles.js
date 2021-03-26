import React, { useState, useContext, Fragment } from 'react';
import EventListener from 'react-event-listener';

import { Context } from "../../assets/context";

export default () => {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      value: '',
      button: 'bad'
   })

   // AUDIT INPUT
   function audit(event) {

      // SHORTHAND
      const input = event.target.value;

      // ATTEMPT TO VALIDATE
      try {
         const parsed = JSON.parse(input);
         const keys = Object.keys(parsed);

         if (keys.length && keys[0].toLowerCase() === 'profiles' && parsed.profiles instanceof Array) {
            set_local({
               value: input,
               button: 'good'
            })
         } else {
            set_local({
               value: input,
               button: 'bad'
            })
         }

      // IF THE VALIDATION FAILS
      } catch {
         set_local({
            value: input,
            button: 'bad'
         })
      }
   }

   // REPLACE OLD PROFILE OBJECT
   function submit() {
      if (local.button === 'good') {
         
         // UPDATE STATE
         dispatch({
            type: 'import-profiles',
            payload: {
               profiles: new Map(JSON.parse(local.value).profiles),
               msg: 'IMPORTED PROFILE SUCCESSFULLY'
            }
         })

         // RESET THE BUTTON
         set_local({
            value: '',
            button: 'bad'
         })
      }
   }

   // ENTER KEY LISTENER
   function key_listener(event) {
      if (event.key.toLowerCase() === 'enter' && state.prompt.visible) {
         submit();
      }
   }

   return (
      <Fragment>
         <div id={ 'header' }>Import Profiles</div>
         <div id={ 'import' }>
            <EventListener
               target={ 'window' }
               onKeyDown={ key_listener }
            />
            <textarea
               id={ 'route' }
               type={ 'file' }
               onChange={ audit }
               value={ local.value }
            />
            <input
               type={ 'submit' }
               id={ local.button }
               value={ 'Replace' }
               onClick={ submit }
            />
         </div>
      </Fragment>
   )
}