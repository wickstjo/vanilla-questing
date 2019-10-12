import React, { useContext } from 'react';
import { Context } from "../../context";
import { preload_bgs, sleep } from "../../funcs/misc";
import Main from './main';
import Sub from './sub';

function Actions() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // IMPORT CUSTOM ROUTE
   function custom() {
      dispatch({
         type: 'show-prompt',
         payload: 'import-route'
      })
   }

   // PRELOAD BACKGROUNDS
   function preload() {

      // LOG START MESSAGE
      console.log('Started Preload!');

      // SHOW LOADING PROMPT
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // WAIT 200MS TO EVEN OUT UI
      sleep(200).then(() => {

         // START PRELOADING
         preload_bgs().then(() => {

            // LOG SUCCESS & HIDE PROMPT
            console.log('Preload Complete!');

            // HIDE PROMPT
            dispatch({ type: 'hide-prompt' })

            // SHOW MESSAGE
            dispatch({
               type: 'add-message',
               payload: {
                  msg: 'backgrounds preloaded',
                  type: 'good'
               }
            })
         })
      })
   }

   // JUMP TO A SPECIFIC LEVEL
   function jump() {
      dispatch({
         type: 'show-prompt',
         payload: 'jump-level'
      })
   }

   return (
      <Main header='Actions'>
         <Sub
            header={ 'Preload Backgrounds' }
            icon={ 'preload' }
            func={ preload }
         />
         <Sub
            header={ 'Import Custom Route' }
            icon={ 'import' }
            func={ custom }
         />
         <Sub
            header={ 'Jump to level' }
            icon={ 'jump' }
            func={ jump }
         />
      </Main>
   )
}

export default Actions;