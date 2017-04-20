import {createStore, combineReducers, applyMiddleware} from "redux";
import { logger } from 'redux-logger';

import squaresReducer from "./reducers/squaresReducer";
import userReducer from "./reducers/userReducer";

export default createStore(
    combineReducers({ 
        squaresState: squaresReducer, 
        userState: userReducer 
    }),
    {}, 
    applyMiddleware(logger)
);