import React from 'react';

function Circle({ waypoint, block, offcolor }) { return (
   <circle
      cx={ waypoint.coords.x + '%' }
      cy={ waypoint.coords.y + '%' }
      fill={ offcolor ? 'rgb(28, 68, 117)' : 'rgb(255, 39, 39)' }
      id={ 'circle-' + block }
   />
)}

export default Circle;