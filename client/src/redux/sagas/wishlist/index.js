import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosServices } from "../../../network/AxiosServices";
import { ApiServices } from "../../../network/ApiServices";
import { WISHLIST } from "../../constants/wishlist";

function* getWishlist(actions) {
  try {
    let result = yield call(
      AxiosServices.get,
      ApiServices.FETCH_WISHLIST,
      null
    );

    yield put({
      type: WISHLIST.FETCH_WISHLIST.SUCCESS,
      result: result.data.data,
    });
  } catch (err) {
    yield put({
      type: WISHLIST.FETCH_WISHLIST.FAILURE,
      result: err.response.data.msg,
    });
  }
}

function* addWishlist(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.ADD_WISHLIST,
      actions.data
    );

    yield put({
      type: WISHLIST.ADD_WISHLIST.SUCCESS,
      result: result.data.data,
    });
  } catch (err) {
    yield put({
      type: WISHLIST.ADD_WISHLIST.FAILURE,
      result: err.response.data.msg,
    });
  }
}

function* removeWishlist(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.REMOVE_WISHLIST,
      actions.data
    );

    yield put({
      type: WISHLIST.REMOVE_WISHLIST.SUCCESS,
      result: result.data.data,
    });
  } catch (err) {
    yield put({
      type: WISHLIST.REMOVE_WISHLIST.FAILURE,
      result: err.response.data.msg,
    });
  }
}

function* clearWishlist(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.CLEAR_WISHLIST,
      actions.data
    );

    yield put({
      type: WISHLIST.CLEAR_WISHLIST.SUCCESS,
      result: result.data.data,
    });
  } catch (err) {
    yield put({
      type: WISHLIST.CLEAR_WISHLIST.FAILURE,
      result: err.response.data.msg,
    });
  }
}

export default function* wishlistSagas() {
  yield takeLatest(WISHLIST.FETCH_WISHLIST.MAIN, getWishlist);
  yield takeLatest(WISHLIST.ADD_WISHLIST.MAIN, addWishlist);
  yield takeLatest(WISHLIST.REMOVE_WISHLIST.MAIN, removeWishlist);
  yield takeLatest(WISHLIST.CLEAR_WISHLIST.MAIN, clearWishlist);
}
