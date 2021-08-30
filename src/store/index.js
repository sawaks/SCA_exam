import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  updateFirebaseMiddleware,
  updatedSortOrderAndPersonalisedInfoOnShow,
  addSortOrderAndPersonalisedInfoOnShow,
  updateListeningStatusOnShowAndPlaylist,
  updatedPersonalisedInfoOnPlaylist } from './middlewares/firebase';
import playersOrchestratorMiddleware from './middlewares/playersOrchestrator';
import reducers from './reducers';

const makeStore = initialState => createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(applyMiddleware(
    thunk,
    playersOrchestratorMiddleware,
    updateFirebaseMiddleware,
    updatedSortOrderAndPersonalisedInfoOnShow,
    addSortOrderAndPersonalisedInfoOnShow,
    updateListeningStatusOnShowAndPlaylist,
    updatedPersonalisedInfoOnPlaylist
  ))
);

export default makeStore;
