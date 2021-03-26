import React, { useContext } from 'react';
import { Context } from "../../assets/context";

import Main from './main';
import Sub from './sub';

function Help() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // REFERENCES PROMPT
   function references() {
      dispatch({
         type: 'show-prompt',
         payload: 'references'
      })
   }

   return (
      <Main header='Help'>
         <Sub
            header={ 'References' }
            icon={ 'references' }
            func={ references }
         />
         <Sub
            header={ 'Report Issues' }
            icon={ 'report' }
            link={ '/vanilla-questing/manifesto#contribute' }
         />
         <Sub
            header={ 'Donate' }
            icon={ 'donate' }
            url={ 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LNLHSGMLKXL74&source=url' }
         />
      </Main>
   )
}

export default Help;