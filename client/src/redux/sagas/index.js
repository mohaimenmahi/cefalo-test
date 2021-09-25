import { all } from "redux-saga/effects";
import authSagas from "./auth";
import homeSagas from "./home";
import wishlistSagas from "./wishlist";

function* rootSaga() {
  yield all([authSagas(), homeSagas(), wishlistSagas()]);
}

export default rootSaga;
