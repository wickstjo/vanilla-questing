import React, { useContext } from 'react';
import { Context } from "../../assets/context";

import Main from './main';
import Sub from './sub';

function Storage() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // IMPORT PROFILES
   function Import() {
      dispatch({
         type: 'show-prompt',
         payload: 'import-profiles'
      })
   }

   // EXPORT PROFILES
   function Export() {
      dispatch({
         type: 'show-prompt',
         payload: 'export'
      })
   }

   return (
      <Main header='Storage'>
         <Sub
            header={ 'Export Profiles' }
            icon={ 'export_profiles' }
            func={ Export }
         />
         <Sub
            header={ 'Import Profiles' }
            icon={ 'import_profiles' }
            func={ Import }
         />
      </Main>
   )
}

export default Storage;