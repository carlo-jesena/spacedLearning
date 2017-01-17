/* eslint-env browser */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Main from '.components/main';
import reducer from './reducers';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

const store = createStore(moviesReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);

export default store;
