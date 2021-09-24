import { combineReducers } from "redux";
import authReducer from "./auth";
import homeReducer from "./home";
import wishlistReducer from "./wishlist";

export default combineReducers({
  authReducer,
  homeReducer,
  wishlistReducer,
});
