import React, { useContext } from 'react';
import { Context } from "../assets/context";
import '../interface/css/innerbody.scss';

import EventListener from 'react-event-listener';
import { key_listener } from '../funcs/browsing';

import Map from '../components/map';
import Panel from '../components/panel';

function Home() {
   
   // GLOBAL CONTEXT
   const { state, dispatch } = useContext(Context);
   
   // KEYBOARD EVENT LISTENER
   function key_event(event) {
      key_listener(event, state, dispatch)
   }

   return (
      <div id={ 'innerbody' }>
         <EventListener
            target={ document }
            onKeyDown={ key_event }
         />
         <div className={ 'inner' }>
            <div id={ 'map-wrapper' }>
               <Map />
            </div>
            <div id={ 'panel-wrapper' }>
               <Panel />
            </div>
         </div>
      </div>
   )
}

export default Home;