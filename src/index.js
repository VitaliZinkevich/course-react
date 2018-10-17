import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// setup Redux
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

// import async staff for redux
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
import promise from 'redux-promise-middleware'


// import reducers 
import rootReducer from './redux/reducer'

// import Redux actions 
import {fetchHotels} from './redux/actions'

const store = createStore(rootReducer, applyMiddleware(promise(),thunk, logger));

// store.dispatch((dispatch)=>{
//     dispatch (fetchHotels)
// })

store.dispatch(fetchHotels)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
