// BROWSE TO PREVIOUS BLOCK
function previous(state, dispatch) {
   const prev = state.current - 1;

   // IF THERE IS ROOM TO MOVE
   if (prev >= 0) {
      dispatch({
         type: 'block',
         payload: prev
      })
   }
}

// BROWSE TO NEXT BLOCK
function next(state, dispatch) {
   const next = state.current + 1;

   // IF THERE IS ROOM TO MOVE
   if (next <= state.data.route.length - 1) {
      dispatch({
         type: 'block',
         payload: next
      })
   }
}

// JUMP IN PROGRESS
function jump(event, state, dispatch) {

   // EVENT PARAMS
   const parameters = {
      window: window.innerWidth,
      width: event.target.clientWidth,
      coord: event.pageX + 7
   }

   // FIND CLOSEST ROUTE BLOCK
   const length = parameters.width - (parameters.window - parameters.coord);
   const percent = length / parameters.width;
   const final = Math.floor(percent * state.data.route.length);

   // UPDATE STATE
   dispatch({
      type: 'block',
      payload: final
   });
}

// JUMP TO A SPECIFIC LEVEL IN PROGRESS
function jumpToLevel(level, state, dispatch) {
   // FIND WHAT BLOCK MATCHES GIVEN LEVEL
   const newBlock = state.data.route.findIndex((route, iRoute) => {
      return Math.floor(route.experience) === Math.floor(level);
   });
   // MAKE SURE THE NEW BLOCK EXISTS
   if (newBlock !== -1) {
      dispatch({
         type: 'block',
         payload: newBlock
      });
   } else {
      // SHOW ERROR MESSAGE
      dispatch({
         type: 'add-message',
         payload: {
            msg: 'Sorry, we could not jump to that level for some reason',
            type: 'bad'
         }
      })
   }
}

// BROWSING KEY LISTENER
const key_listener = (event, state, dispatch) => {

   // IF KEYBINDS ARE ENABLED, EXECUTE REQUEST
   if (state.settings.keybinds === 'enable') {
      switch (event.code) {

         // PREVIOUS BLOCK
         case state.settings.binds.backward:
            if (!state.prompt.visible) {
               previous(state, dispatch);
            }
         break;

         // NEXT BLOCK
         case state.settings.binds.forward:
            if (!state.prompt.visible) {
               next(state, dispatch);
            }
         break;

         // SHOW REFERENCES
         case state.settings.binds.references:
            if (!state.prompt.visible) {
               dispatch({
                  type: 'show-prompt',
                  payload: 'references'
               })
            }
         break;

         // CLOSE PROMPT
         case state.settings.binds.close:
            dispatch({
               type: 'hide-prompt',
            })
         break;

         // FALLBACK
         default:
            return null;
      }
   }
}

export {
   next,
   previous,
   jump,
   jumpToLevel,
   key_listener
}