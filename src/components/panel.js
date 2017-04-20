/*jshint esversion: 6 */
import React from 'react';

const Panel = function(props) {
 
    return (
      <div>
        <button onClick={props.start}>Start</button>
        <button onClick={props.pause}>Pause</button>
        <button onClick={props.clear}>Clear</button>
        <button onClick={()=>props.resize(50,80)}>50x80</button>
        <button onClick={()=>props.resize(40,65)}>40x65</button>
        <button onClick={()=>props.resize(30,50)}>30x50</button>
      </div>
    );
};

export default Panel;