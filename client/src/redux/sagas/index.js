import { all } from "redux-saga/effects";
import authSagas from "./auth";

function* rootSaga() {
  yield all([authSagas()]);
}

export default rootSaga;
