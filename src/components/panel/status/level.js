import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../assets/context";

function Level() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      level: 0,
      width: {}
   })

   // LOCAL HEADER
   const [header, set_header] = useState('Level');

   // RECALIBRATE LEVEL VALUES
   useEffect(() => {

      // FISH OUT CURRENT LEVEL
      const current = state.data.route[state.current].experience.toFixed(2);

      // SET LOCAL STATE
      set_local({
         level: current,
         width: {
            width: current.split('.')[1] + '%'
         }
      })

   }, [state.current, state.data])

   // TRANSLATE HEADER
   useEffect(() => {
      if (state.settings.language !== 'en') {

         // FETCH & SET NEW NAME
         const name = state.lang.terms[state.settings.language].panel['level'];
         set_header(name);
      }
   }, [state.settings.language])

   return (
      <div id="level">
         <div className="split">
            <div>{ header }</div>
            <div>{ local.level }</div>
            <div id="bar" style={ local.width }></div>
         </div>
      </div>
   )
}

export default Level;