import React, { useContext } from 'react';
import { Context } from "../../assets/context";

import Main from './main';
import Sub from './sub';

function Create() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // CREATE PROFILE
   function create(race) {
      dispatch({
         type: 'create-prompt',
         payload: race
      })
   }

   // ALLIANCE
   function human() { create('human') }
   function dwarf() { create('dwarf') }
   function gnome() { create('gnome') }
   function nelf() { create('nelf') }

   // HORDE
   function orc() { create('orc') }
   function troll() { create('troll') }
   function tauren() { create('tauren') }
   function undead() { create('undead') }

   return (
      <Main header={ 'New Character' }>
         <Sub
            header={ 'Human' }
            icon={ 'human' }
            func={ human }
         />
         <Sub
            header={ 'Dwarf' }
            icon={ 'dwarf' }
            func={ dwarf }
         />
         <Sub
            header={ 'Gnome' }
            icon={ 'gnome' }
            func={ gnome }
         />
         <Sub
            header={ 'Night Elf' }
            icon={ 'nelf' }
            func={ nelf }
         />
         <Sub
            header={ 'Orc' }
            icon={ 'orc' }
            func={ orc }
         />
         <Sub
            header={ 'Troll' }
            icon={ 'troll' }
            func={ troll }
         />
         <Sub
            header={ 'Tauren' }
            icon={ 'tauren' }
            func={ tauren }
         />
         <Sub
            header={ 'Undead' }
            icon={ 'undead' }
            func={ undead }
         />
      </Main>
   )
}

export default Create;