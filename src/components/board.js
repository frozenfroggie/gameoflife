/*jshint esversion: 6 */
import React from 'react';

const Board = function(props) {
  let squares = [];
  let rows = props.rows;
  let cols = props.cols;
  let isAlive;
  let style;
   // Creates all lines:
  for(let i=0; i <= rows; i++){

      // Creates an empty line
      squares.push([]);

      // Adds cols to the empty line:
      squares[i].push( new Array(cols));

      for(let j=0; j <= cols + 1; j++){
        // Initializes:
        if(j == cols + 1) {
            squares[i][j] = <div style={{"clear":"both"}}></div>;
        } else {
          isAlive = props.squares[i][j].alive;
          isAlive ? style = {"float":"left", "border": "1px solid red", "padding": 4,"backgroundColor": "red"} : style = {"float":"left", "border": "1px solid red", "padding": 4};
          squares[i][j] = <div onClick={() => props.getAlive(i,j)} style={style}></div>;
        }
      }
  }
  
    return (
      <div>
        { squares }
      </div>
    );
};

export default Board;