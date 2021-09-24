import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosServices } from "../../../network/AxiosServices";
import { ApiServices } from "../../../network/ApiServices";
import { HOME } from "../../constants/home";

function* fetchProducts(actions) {
  try {
    let result = yield call(AxiosServices.get, ApiServices.FETCH_PRODUCT, null);

    yield put({ type: HOME.FETCH_PRODUCTS.SUCCESS, result: result.data });
  } catch (err) {
    console.log("Error", err.response);
    yield put({
      type: HOME.FETCH_PRODUCTS.FAILURE,
      result: err.response.data,
    });
  }
}

function* searchResult(actions) {
  try {
    let result = yield call(
      AxiosServices.post,
      ApiServices.SEARCH_PRODUCT,
      actions.data
    );

    yield put({ type: HOME.SEARCH_PRODUCTS.SUCCESS, result: result.data });
  } catch (err) {
    yield put({
      type: HOME.SEARCH_PRODUCTS.FAILURE,
      result: err.response.data,
    });
  }
}

export default function* homeSagas() {
  yield takeLatest(HOME.FETCH_PRODUCTS.MAIN, fetchProducts);
  yield takeLatest(HOME.SEARCH_PRODUCTS.MAIN, searchResult);
}
