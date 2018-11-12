import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import combinedReducer from '../redux/reducer/'


import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'


const store = createStore(combinedReducer, applyMiddleware(promise(),thunk));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
