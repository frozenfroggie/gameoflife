/*jshint esversion: 6 */
import React from 'react';
import Board from '../components/board';
import NavigationPanel from './navigationPanel';
import SavingWindow from './savingWindow';
import About from '../components/about';
import Login from '../components/login';
import Logout from '../components/logout';
import Display from '../components/display';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";

//ACTIONS
import { loadLocalStorage } from "../actions/loadingBoardsActions";
import { loadBoards } from "../actions/loadingBoardsActions";
import { showAbout, showSavingPanel, changeErrorInputVisbility } from "../actions/visibilityActions";
import { resizeCols, resizeRows } from "../actions/rowsColsActions";
import { setSquaresInitial, clearSquares, setSquares } from "../actions/squaresActions";
import { updateCurrentFps, resetRenderingPer2s, updateRenderingPer2s } from "../actions/fpsActions";
import { adminLogin, userLogin, logout } from "../actions/authActions";

//GLOBAL VARIABLES
let GAME_INTERVAL;
let PREV_DATE, PREV_SEC;

class App extends React.Component {
  constructor(props) {
    super(props);
    //binding crucial functions in contructor for better performance
    this.countCurrentFps = this.countCurrentFps.bind(this);
    this.start = this.start.bind(this);
    this.gameEngine = this.gameEngine.bind(this);
    this.amountOfNeighbours = this.amountOfNeighbours.bind(this);
    this.isNeighbour = this.isNeighbour.bind(this);
    this.wrap = this.wrap.bind(this);
    this.getAlive = this.getAlive.bind(this);
  }
  //loading saved boards from serve
  componentDidMount = () => {
    this.props.loadLocalStorage();
    this.props.loadBoards();
    axios.get('https://enigmatic-island-38218.herokuapp.com/authentication/')
      .then( response => {
        response.data.adminAuth ? this.props.adminLogin(response.data.user) : response.data.userAuth ? this.props.userLogin(response.data.user) : "";
        console.log(response.data.user);
      })
      .catch(error => error.response ? console.log(error.response) : "");
  }
  componentWillUnmount() {
		clearInterval(GAME_INTERVAL);
	}
	// begin the game- choose who should live!
  getAlive(row,col) { 
    let initialSquares = this.props.squaresState.squares;
    initialSquares[row][col].alive = !initialSquares[row][col].alive ? true : false;
    this.props.setSquaresInitial(initialSquares);
  }
  //borders wrapping
  wrap(j,i) { 
    let x = i, y = j;
    let rowMaxIdx = this.props.rowsColsState.rows;
    let colMaxIdx = this.props.rowsColsState.cols;
    if(i>colMaxIdx) x = 0;
    if(i<0) x = colMaxIdx;
    if(j>rowMaxIdx) y = 0; 
    if(j<0) y = rowMaxIdx;  
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
  isNeighbour(y,x,squares) {
    const arr = this.wrap(y,x);
    const wrappedY = arr[0];
    const wrappedX = arr[1];
    if(squares[wrappedY][wrappedX].alive==true) {
      return true;
    }
  }
  amountOfNeighbours(j,i,squares) {
    let neighbours = 0;
    if(this.isNeighbour(j-1,i-1,squares)) neighbours++; //left top
    if(this.isNeighbour(j-1,i,squares)) neighbours++; //top
    if(this.isNeighbour(j-1,i+1,squares)) neighbours++; //right top
    if(this.isNeighbour(j,i-1,squares)) neighbours++; //left
    if(this.isNeighbour(j,i+1,squares)) neighbours++; //right
    if(this.isNeighbour(j+1,i-1,squares)) neighbours++; //left bottom
    if(this.isNeighbour(j+1,i,squares)) neighbours++; //bottom
    if(this.isNeighbour(j+1,i+1,squares)) neighbours++; //right bottom
    return neighbours;
  }
  //func that checks every organism (in every square) that should be alive or not
  gameEngine(squares) { 
    let whoDie = [];
    let whoBorn = [];
    squares.forEach((row,j)=>{
      row.forEach((cell,i)=>{
          const neighbours = this.amountOfNeighbours(j,i,squares);
          const isAlive = squares[j][i].alive;
          if( (isAlive && neighbours > 3) || (isAlive && neighbours < 2) ) {
            whoDie.push([j,i]);
          } else if(!isAlive && neighbours == 3) {
            whoBorn.push([j,i]);
          } 
      });
    });
    return [whoDie,whoBorn];
  }
  //let's start the game!
  start() {
    const arr = this.gameEngine(this.props.squaresState.squares);
    const whoDie = arr[0];
    const whoBorn = arr[1];
    let oldSquares = this.props.squaresState.squares;
    whoDie.forEach((el)=>{
      oldSquares[el[0]][el[1]].alive = false;
    });
    whoBorn.forEach((el)=>{
      oldSquares[el[0]][el[1]].alive = true;
    });
    this.props.setSquares(oldSquares); //actually new squares.. (oldSquares after update)
    this.countCurrentFps(); //update amount of renderings (increment)
  }
  startInterval = () => {
    const fps = this.props.fpsState.desirableFps;
    const ms = 1000 / fps;
    GAME_INTERVAL = setInterval(this.start,ms);
    PREV_DATE = new Date;
    PREV_SEC = PREV_DATE.getSeconds();
  }
  pause = () => {
    clearInterval(GAME_INTERVAL);
    this.props.updateCurrentFps(0);
  }
  clear = () => {
    let squares = this.props.squaresState.squares;
    squares.forEach((row,i)=>{
      row.forEach((cell,j)=>{
        cell.alive = false;
      });
    });
    this.props.clearSquares(squares);
    this.props.updateCurrentFps(0);
  }
  resize = (rows,cols) => {
    this.props.resizeRows(rows);
    this.props.resizeCols(cols);
  }
  //hide saving panel if user clicked outside
  clickedOutside = (e) => {
    const savingWindow = document.querySelector(".saving");
    if (savingWindow) {
      const isClickedInside = savingWindow.contains(e.target);
      if (!isClickedInside) {
        this.props.showSavingPanel(false);
        this.props.changeErrorInputVisbility(false);
      }
    }
  };
  countCurrentFps() {
    let currentDate = new Date();
    let currentSec = currentDate.getSeconds();
    this.props.updateRenderingPer2s();        //increment rendering per 2s value
    if(Math.abs(currentSec - PREV_SEC) >= 2) { //how much time has elapsed since startInterval()
      this.props.updateCurrentFps(this.props.fpsState.renderingPer2s/2);
      this.props.resetRenderingPer2s();
      PREV_DATE = new Date();                  //change time reference
      PREV_SEC = PREV_DATE.getSeconds();
    }
  }
  logout = () => {
    this.props.logout();
    axios.post('https://enigmatic-island-38218.herokuapp.com/logout/')
        .then( response => console.log('logout'))
        .catch( error => error.response ? console.log(error.response) : '');
  }
  render() {
    const showSavingPanel = this.props.visibilityState.savingPanelVisibility;
    const showLogin = !(this.props.authState.admin || this.props.authState.user);
    const showAbout = this.props.visibilityState.aboutVisibility;
    return (
      <div className="container" onClick={this.clickedOutside}>
    
        { showSavingPanel ? <SavingWindow /> : ""}
        
        <div className="loginCont">
          { showLogin ? <Login /> : "" }
        </div>
        
        { !showLogin ? <Logout logout={()=>this.logout()} name={this.props.authState.name}/> : "" }
        
        <nav>
          <NavigationPanel resize={(rows,cols) => this.resize(rows,cols)} 
                           start={()=>this.startInterval()} 
                           pause={this.pause} 
                           clear={this.clear} 
          />
        </nav>
        
        <main>
          { 
            showAbout ? <About showAbout={(bool) => this.props.showAbout(bool)}/> 
            : 
            <Board squaresState={this.props.squaresState}
                   getAlive={(rows,cols) => this.getAlive(rows,cols)}
                   rowsColsState={this.props.rowsColsState} 
            />
          }
        </main>
        
        <aside>
          <Display generation={this.props.generationState.generation} 
                   currentFps = {this.props.fpsState.currentFps} 
                   desirableFps = {this.props.fpsState.desirableFps} 
          />
        </aside>
        
        <footer>
          <em>John Conway's Game of Life created by frozenfroggie</em>
        </footer>
        
      </div>
    );
  }
}

App.propTypes = {
  generationState: PropTypes.object.isRequired,
  squaresState: PropTypes.object.isRequired,
  fpsState: PropTypes.object.isRequired,
  rowsColsState: PropTypes.object.isRequired,
  setSquaresInitial: PropTypes.func.isRequired,
  setSquares: PropTypes.func.isRequired,
  clearSquares: PropTypes.func.isRequired,
  resizeRows: PropTypes.func.isRequired,
  resizeCols: PropTypes.func.isRequired,
  showSavingPanel: PropTypes.func.isRequired,
  loadBoards: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
    return {
      squaresState: store.squares,
      fpsState: store.fps,
      rowsColsState: store.rowsCols,
      generationState: store.generation,
      visibilityState: store.visible,
      authState: store.authentication
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setSquaresInitial: (squares) => dispatch(setSquaresInitial(squares)),
      setSquares: (squares) => dispatch(setSquares(squares)),
      clearSquares: (deadSquares) => dispatch(clearSquares(deadSquares)),
      resizeRows: (rowsNum) => dispatch(resizeRows(rowsNum)),
      resizeCols: (colsNum) => dispatch(resizeCols(colsNum)),
      updateCurrentFps: (fps) => dispatch(updateCurrentFps(fps)),
      updateRenderingPer2s: () => dispatch(updateRenderingPer2s()),
      resetRenderingPer2s: () => dispatch(resetRenderingPer2s()),
      showSavingPanel: (bool) => dispatch(showSavingPanel(bool)),
      showAbout: (bool) => dispatch(showAbout(bool)),
      adminLogin: (profile) => dispatch(adminLogin(profile)),
      userLogin: (profile) => dispatch(userLogin(profile)),
      logout: () => dispatch(logout()),
      loadLocalStorage: () => dispatch(loadLocalStorage()),
      loadBoards: () => dispatch(loadBoards()),
      changeErrorInputVisbility: (bool) => dispatch(changeErrorInputVisbility(bool))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);