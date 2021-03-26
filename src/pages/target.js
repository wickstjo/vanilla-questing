import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ match }) => {
   
   // MAKE PARAMS GLOBALLY AVAILABLE
   window.request = match.params;

   // REDIRECT TO ROOT
   return <Redirect to={ '/' } />
}