/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';

const Board = function(props) {
  let squares = [];
  let rows = props.rowsColsState.rows;
  let cols = props.rowsColsState.cols;
  let isAlive;
  let style;
  let padding;
  switch(rows) {
    case 29: padding = 6; break;
    case 39: padding = 5; break;
    case 49: padding = 4; break;
  }
  for(let i=0; i <= rows; i++) {              // Creates all lines:
      squares.push([]);                       // Creates an empty line
      squares[i].push( new Array(cols));      // Adds cols to the empty line
      for(let j=0; j <= cols; j++){           // Initializing
          isAlive = props.squaresState.squares[i][j].alive;
          isAlive ? style = {"border": "1px solid rgb(12,43,54)", "padding": padding,"backgroundColor": "rgb(12,43,54)", "boxShadow": "2px 2px 5px 1px rgba(0,0,0,0.7)"} : style = {"border": "1px solid grey", "padding": padding};
          if( i==0 && j==0 ) {
            style = {...style, "borderTopLeftRadius": 5};
          } else if( i==0 && j==cols ) {
             style = {...style, "borderTopRightRadius": 5};
          } else if( i==rows && j==0 ) {
             style = {...style, "borderBottomLeftRadius": 5};
          } else if( i==rows && j==cols ) {
             style = {...style, "borderBottomRightRadius": 5};
          } 
          squares[i][j] = <div onClick={() => props.getAlive(i,j)} style={style}></div>;
      }
  }
  let containerWidth = (cols + 1) * (padding * 2 + 2);
  let containerHeight = (rows + 1) * (padding * 2 + 2);
  const boardStyle = {
    "display":"flex", "flexWrap":"wrap", "position": "relative",
    "border": "5px solid rgb(12,43,54)", "width": containerWidth,
    "height": containerHeight, "boxSizing": "content-box", "borderRadius": 10,
    "backgroundColor": "rgba(200,200,200,0.1)", "boxShadow": "3px 3px 9px 2px rgba(0,0,0,0.75)"
  };
  return (
      <div style={boardStyle}>
        { squares }
      </div>
  );
};

Board.propTypes = {
  squaresState: PropTypes.object,
  rowsColsState: PropTypes.object,
  getAlive: PropTypes.func
};

export default Board;