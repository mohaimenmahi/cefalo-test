import { all } from "redux-saga/effects";
import authSagas from "./auth";
import homeSagas from "./home";

function* rootSaga() {
  yield all([authSagas(), homeSagas()]);
}

export default rootSaga;
