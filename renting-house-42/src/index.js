import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './assets/fonts/iconfont.css'
import './untils/axios'
import {
    Provider
} from 'react-redux'
import store from './store'
const rootElement = document.getElementById('root')

ReactDOM.render( < Provider store = {
            store
        } > < App / > </Provider>,rootElement);
        //导入axios


        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.unregister();