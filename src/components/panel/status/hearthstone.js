import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../assets/context";

function Hearthstone() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCATION & HEADER STATES
   const [location, set_location] = useState(null)
   const [header, set_header] = useState('Hearthstone');

   // FIND LATEST HEARTHSTONE LOCATION
   useEffect(() => {

      // FILTER OUT RELEVANT HEARTHSTONE LOCATIONS
      const filtered = state.data.hearthstones.filter(id => id.block < state.current);
      let value = 'none';

      // IF THERES LOCATIONS FOUND, FETCH THE MOST RECENT ONE
      if (filtered.length !== 0) {
         value = filtered[filtered.length - 1].zone;
      }

      // TRANSLATE IF NECESSARY
      if (value !== 'none' && state.settings.language !== 'en') {
         value = state.lang.terms[state.settings.language].zones[value]
      }

      // UPDATE LOCATION
      set_location(value)

   }, [state.current, state.data])

   // TRANSLATE HEADER
   useEffect(() => {
      if (state.settings.language !== 'en') {

         // FETCH & SET NEW NAME
         const name = state.lang.terms[state.settings.language].panel['hearthstone'];
         set_header(name);
      }
   }, [state.settings.language])

   return (
      <div id="hearthstone" className="split">
         <div>{ header }</div>
         <div>{ location }</div>
      </div>
   )
}

export default Hearthstone;