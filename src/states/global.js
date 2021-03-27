import { update as update_profiles, change as update_block } from "../funcs/storage";
import { update_bind, update_prop } from "../funcs/settings";

// DEFUALT VALUES
const values = {
   data: null,
   current: 0,
   profiles: null,
   settings: null,
   request: null,
   loaded: null,
   messages: [],
   prompt: {
      visible: false,
      type: null
   },
   lang: {}
}

// REDUCER
function reducer(state, action) {
   switch (action.type) {

      // ON THE INITIAL PAGE LOAD
      case 'init': { return {
         ...state,
         profiles: action.payload.profiles,
         settings: action.payload.settings,
         lang: action.payload.lang,
         prompt: {
            ...state.prompt,
            visible: false
         }
      }}

      // LOAD PROFILE
      case 'load-profile': { return {
         ...state,
         data: action.payload.build.data,
         current: action.payload.build.current,
         loaded: action.payload.profile,
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: 'good'
            }
         ]
      }}

      // LOAD BUILD REQUEST
      case 'load-request': { return {
         ...state,
         data: action.payload.data,
         current: action.payload.current
      }}

      // REMOVE PROFILE
      case 'remove-profile': { return {
         ...state,
         profiles: update_profiles(action.payload.profiles),
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: 'good'
            }
         ]
      }}

      // ADD PROFILE
      case 'add-profile': { return {
         ...state,
         data: action.payload.data,
         current: action.payload.current,
         loaded: action.payload.profile,
         profiles: update_profiles(action.payload.profiles),
         prompt: {
            ...state.prompt,
            visible: false
         },
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: 'good'
            }
         ]
      }}

      // IMPORT ROUTE
      case 'import-route': { return {
         ...state,
         data: action.payload.data,
         current: action.payload.current,
         loaded: null,
         prompt: {
            ...state.prompt,
            visible: false
         },
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: 'good'
            }
         ]
      }}

      // IMPORT PROFILES
      case 'import-profiles': { return {
         ...state,
         profiles: update_profiles(action.payload.profiles),
         loaded: null,
         prompt: {
            ...state.prompt,
            visible: false
         },
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: 'good'
            }
         ]
      }}

      // CREATE PROFILE PROMPT
      case 'create-prompt': { return {
         ...state,
         request: action.payload,
         prompt: {
            visible: true,
            type: 'create'
         }
      }}

      // CHANGE BLOCK
      case 'block': { return {
         ...state,
         current: update_block(state, action.payload)
      }}

      // SHOW SPECIFIC PROMPT
      case 'show-prompt': { return {
         ...state,
         prompt: {
            visible: true,
            type: action.payload
         }
      }}

      // HIDE PROMPT
      case 'hide-prompt': { return {
         ...state,
         prompt: {
            ...state.prompt,
            visible: false
         }
      }}

      // CHANGE KEYBIND
      case 'change-keybind': { return {
         ...state,
         settings: update_bind(state.settings, action.payload)
      }}

      // CHANGE SETTING
      case 'change-setting': { return {
         ...state,
         settings: update_prop(state.settings, action.payload)
      }}

      // ADD MESSAGE
      case 'add-message': { return {
         ...state,
         messages: [
            ...state.messages, {
               text: action.payload.msg,
               type: action.payload.type
            }
         ]
      }}

      // FALLBACK
      default: {
         console.log('Context reducer type not found');
         return state;
      }
   }
}

export {
   values,
   reducer
}