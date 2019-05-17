import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";

function Level() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      level: 0,
      width: {}
   })

   // RECALIBRATE LEVEL VALUES
   useEffect(() => {

      // FISH OUT CURRENT LEVEL
      const current_level = state.data.route[state.current].experience.toFixed(2);

      set_local({
         level: current_level,
         width: {
            width: current_level.split('.')[1] + '%'
         }
      })
   }, [state.current, state.data])

   return (
      <div id="level">
         <div className="split">
            <div>Level</div>
            <div>{ local.level }</div>
            <div id="bar" style={ local.width }></div>
         </div>
      </div>
   )
}

export default Level;