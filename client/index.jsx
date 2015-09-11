import React                            from 'react';
import { Router }                       from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes                           from 'routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'Immutable';
import promiseMiddleware from '../shared/lib/promiseMiddleware';
import logger from '../shared/lib/promiseMiddleware';

let initialState = window.__INITIAL_STATE__;

Object
  .keys(initialState)
  .forEach(key=> {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

React.render(
  <Provider store={store}>
    {()=> 
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);