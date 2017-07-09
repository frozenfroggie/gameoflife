const axios = require("axios");
const $ = require('jquery');
const defaultLocalData = require('../../data/defaultLocalData.json');

export function loadBoards() {
  return function(dispatch) {
    axios.get("https://gameoflife-using-redux-frozenfroggie.c9users.io/crud/load")
      .then((response) => {
        $.map(response.data, function(board, index) {
          switch(board.structure) {
            case "Spaceship": dispatch({type: "LOAD_SPACESHIPS",  payload: board}); break;
            case "Oscillator": dispatch({type: "LOAD_OSCILLATORS",  payload: board}); break;
            case "Still_life": dispatch({type: "LOAD_STILL_LIFES",  payload: board}); break;
          }
        });
        console.log('loaded successfully from database');
      });
  };
}

export function loadLocalStorage() {
  return function(dispatch) {
    const localBoards = window.localStorage ? JSON.parse(window.localStorage.getItem("localBoards")) : "";
    const dataToPass = localBoards.length > 0 ? localBoards : defaultLocalData;
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