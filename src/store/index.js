import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const makeStore = initialState => createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(applyMiddleware(
    thunk,
  ))
);

export default makeStore;
