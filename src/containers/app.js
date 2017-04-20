/*jshint esversion: 6 */
import React, { PropTypes } from 'react';
import Board from '../components/board';
import Panel from '../components/panel';
import {connect} from "react-redux";
import {setSquares, resizeCols, resizeRows} from "../actions/setSquaresAction";

const INITIAL_ROWS = 49;
const INITIAL_COLS = 79;
let myInterval;

class Container extends React.Component {
  static propTypes = {
    squares: PropTypes.array.isRequired,
    rowsNum: PropTypes.number.isRequired,
    colsNum: PropTypes.number.isRequired
  };
  getAlive = (rows,cols) => {
    let squaresUpdated = this.props.squaresState.squares;
    if(!squaresUpdated[rows][cols].alive) {
      squaresUpdated[rows][cols].alive = true;
    } else {
      squaresUpdated[rows][cols].alive = false;
    }
    this.props.setSquares(squaresUpdated);
    //this.setState({squares: squaresUpdated});
  }
  start = () => {
    let whoDie = gameEngine(this.props.squaresState.squares)[0];
    let whoBorn = gameEngine(this.props.squaresState.squares)[1];
    let oldSquares = this.props.squaresState.squares;
    whoDie.forEach((el)=>{
      oldSquares[el[0]][el[1]].alive = false;
    });
    whoBorn.forEach((el)=>{
      oldSquares[el[0]][el[1]].alive = true;
    });
    //this.setState({squares: oldSquares});
    this.props.setSquares(oldSquares);
  }
  startInterval() {
    myInterval = setInterval(this.start,50);
  }
  pause() {
    clearInterval(myInterval);
  }
  clear = () => {
    let squares = this.props.board.squares;
    squares.forEach((row,i)=>{
      row.forEach((cell,j)=>{
        cell.alive = false;
      });
    });
    //this.setState({squares: squares});
    this.props.setSquares(squares);
  }
  resize = (rows,cols) => {
        this.props.resizeRows(rows);
        this.props.resizeCols(cols);
  }
  save() {
    
  }
  render() {
    return (
      <div>
       <Board rows={this.props.squaresState.rowsNum} cols={this.props.squaresState.colsNum} squares={this.props.squaresState.squares} getAlive={(rows,cols) => this.getAlive(rows,cols)}/>
       <Panel resize={(rows,cols)=>this.resize(rows,cols)} start={()=>this.startInterval()} pause={this.pause} clear={this.clear} save={this.save} squares={this.props.squaresState.squares}/>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
    return {
      squaresState: store.squaresState
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setSquares: (squares) => dispatch(setSquares(squares)),
      resizeRows: (squares) => dispatch(resizeRows(squares)),
      resizeCols: (squares) => dispatch(resizeCols(squares))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Container);

// FUNCTIONS OUTSIDE REACT
let actualRows = INITIAL_ROWS; //helper variable only for functions outside react
let actualCols = INITIAL_COLS;  //helper variable only for functions outside react

function wrap(j,i) { //borders wrapping
  let x = i, y = j;
  let rowMaxIdx = actualRows;
  let colMaxIdx = actualCols;
  if(i>colMaxIdx) {
    x = 0;  
  }
  if(i<0) {
    x = colMaxIdx;
  }
  if(j>rowMaxIdx) {
    y = 0;  
  } 
  if(j<0) {
    y = rowMaxIdx;  
  } 
  if(j<0 && i<0) {
    x = colMaxIdx;
    y = rowMaxIdx;  
  }
  if(j>rowMaxIdx && i>colMaxIdx) {
    x = 0;
    y = 0;
  }
  if(j>rowMaxIdx && i<0) {
    x = colMaxIdx;
    y = 0;
  }
  if(j<0 && i>colMaxIdx) {
    x = 0;
    y = rowMaxIdx;
  }
  return [y,x];
} 

 function isNeighbour(y,x,squares) {
    let arr = wrap(y,x);
    let wrappedY = arr[0];
    let wrappedX = arr[1];
    if(squares[wrappedY][wrappedX].alive==true) {
      return true;
    }
  }

function amountOfNeighbours(j,i,squares) {
  let neighbours = 0;
  if(isNeighbour(j-1,i-1,squares)) neighbours++; //left top
  if(isNeighbour(j-1,i,squares)) neighbours++; //top
  if(isNeighbour(j-1,i+1,squares)) neighbours++; //right top
  if(isNeighbour(j,i-1,squares)) neighbours++; //left
  if(isNeighbour(j,i+1,squares)) neighbours++; //right
  if(isNeighbour(j+1,i-1,squares)) neighbours++; //left bottom
  if(isNeighbour(j+1,i,squares)) neighbours++; //bottom
  if(isNeighbour(j+1,i+1,squares)) neighbours++; //right bottom
  return neighbours;
}

//checks every organism (in every square) that should be life or not
function gameEngine(squares) {  
  let whoDie = [];
  let whoBorn = [];
  squares.forEach((row,j)=>{
    row.forEach((cell,i)=>{
      let neighbours = amountOfNeighbours(j,i,squares);
      let isAlive = squares[j][i].alive;
      if( (isAlive && neighbours > 3) || (isAlive && neighbours < 2) ) {
        whoDie.push([j,i]);
      }
      if(!isAlive && neighbours == 3) {
        whoBorn.push([j,i]);
      }
    });
  });
  return [whoDie,whoBorn];
}