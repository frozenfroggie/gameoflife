import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './containers/app';
import store from "./store";
import 'normalize.css';

// Render the main component into the dom
var rootEl = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , rootEl);
