import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducer from "../reducers/index";
import logger from "redux-logger";

let store;

export function configureStore() {
  store = createStore(combineReducer, applyMiddleware(thunk, logger));

  return store;
}
