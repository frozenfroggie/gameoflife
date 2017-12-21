const axios = require("axios");
const $ = require('jquery');
const defaultLocalData = require('../../data/defaultLocalData.json');

function loadSpaceships(board) {
  return {
    type: "LOAD_SPACESHIPS",
    payload: board
  }
}

function loadOscillators(board) {
  return {
    type: "LOAD_OSCILLATORS",
    payload: board
  }
}

function loadStillLifes(board) {
  return {
    type: "LOAD_STILL_LIFES",
    payload: board
  }
}

export function loadBoardsFromDatabase() {
  return function(dispatch) {
    axios.get("https://game-of-life-frozen.herokuapp.com/crud/load")
      .then((response) => {
        $.map(response.data, function(board, index) {
          switch(board.structure) {
            case "Spaceship": dispatch(loadSpaceships(board)); break;
            case "Oscillator": dispatch(loadOscillators(board)); break;
            case "Still_life": dispatch(loadStillLifes(board)); break;
          }
        });
        console.log('loaded successfully from database');
      });
  };
}


export function loadLocalStorage() {
  return function(dispatch) {
    const localBoards = window.localStorage ? JSON.parse(window.localStorage.getItem("localBoards")) : "";
    const dataToPass = localBoards && localBoards.length > 0 ? localBoards : defaultLocalData;
    if(!Array.isArray(dataToPass)) {
      dispatch({type: "LOAD_LOCAL_STORAGE",  payload: dataToPass});
    } else {
      dataToPass.forEach(board => dispatch({type: "LOAD_LOCAL_STORAGE",  payload: board}));
    }
    console.log('loaded successfully from local storage');
  };
}

export function clearEverything() {
  return {
    type: "CLEAR_EVERYTHING"
  };
}