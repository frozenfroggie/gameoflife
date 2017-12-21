/*jshint esversion: 6 */
import React from 'react';

const Display = function(props) {
    return (
    <div className="asideContainer"> 
      <div>
        <div className="generationDiv">{ props.generation }</div>
      </div>
      <div>
        <div className="currentFps">{ props.currentFps > props.desirableFps ? props.desirableFps : props.currentFps }</div>
      </div>
      <div>
        <div className="desirableFps">{ props.desirableFps }</div>
      </div>
    </div>
     );
};

export default Display;