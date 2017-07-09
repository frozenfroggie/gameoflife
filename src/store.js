import {createStore, combineReducers} from "redux";

import squaresReducer from "./reducers/squaresReducer";
import generationReducer from "./reducers/generationReducer";
import rowsColsReducer from "./reducers/rowsColsReducer";
import fpsReducer from "./reducers/fpsReducer";
import visibilityReducer from "./reducers/visibilityReducer";
import loadingBoardsReducer from "./reducers/loadingBoardsReducer";
import editNameReducer from "./reducers/editNameReducer";
import authReducer from "./reducers/authReducer";

import thunk from "redux-thunk";
import {applyMiddleware} from 'redux';

export default createStore(
    combineReducers({ 
        squares: squaresReducer,
        generation: generationReducer,
        fps: fpsReducer,
        rowsCols: rowsColsReducer,
        loadedBoards: loadingBoardsReducer,
        visible: visibilityReducer,
        editName: editNameReducer,
        authentication: authReducer
    }),
    applyMiddleware(thunk)
);