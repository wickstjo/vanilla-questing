import React, { useContext, useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from "../../assets/context";

function Clipboard() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // HEADER
   const [header, set_header] = useState('Link');

   // TRANSLATE HEADER
   useEffect(() => {
      if (state.settings.language !== 'en') {

         // FETCH & SET NEW NAME
         const name = state.lang.terms[state.settings.language].panel['link'];
         set_header(name);
      }
   }, [state.settings.language])

   // SEND FRONTEND MESSAGE ON COPY
   function message() {
      dispatch({
         type: 'add-message',
         payload: {
            type: 'good',
            msg: 'link copied to clipboard'
         }
      })
   }

   return (
      <CopyToClipboard text={ 'https://wickstjo.github.io/vanilla-questing/' + state.data.race + '/' + state.current } onCopy={ message }>
         <div id={ 'link' }>{ header }</div>
      </CopyToClipboard>
   )
}

export default Clipboard;