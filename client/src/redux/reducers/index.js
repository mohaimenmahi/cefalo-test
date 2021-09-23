import { combineReducers } from "redux";
import authReducer from "./auth";
import homeReducer from "./home";

export default combineReducers({
  authReducer,
  homeReducer,
});
