import { combineReducers } from "redux";
import auth from "./auth";
import trip from "./trip";

export default combineReducers({ auth, trip });
