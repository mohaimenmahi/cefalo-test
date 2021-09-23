import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosServices } from "../../../network/AxiosServices";
import { ApiServices } from "../../../network/ApiServices";
import { AUTH } from "../../constants/auth";

function* signUp(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.USER_SIGN_UP,
      actions.data
    );

    yield put({
      type: AUTH.SET_SIGN_UP.SUCCESS,
      result: result.data,
    });
  } catch (err) {
    yield put({
      type: AUTH.SET_SIGN_UP.FAILURE,
    });
  }
}

function* login(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.USER_LOGIN,
      actions.data
    );

    yield put({
      type: AUTH.SET_LOGIN.SUCCESS,
      result: result.data,
    });
  } catch (err) {
    yield put({
      type: AUTH.SET_LOGIN.FAILURE,
      result: err.response.data,
    });
  }
}

export default function* authSagas() {
  yield takeLatest(AUTH.SET_SIGN_UP.MAIN, signUp);
  yield takeLatest(AUTH.SET_LOGIN.MAIN, login);
}
