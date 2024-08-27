import {handleError} from '@app-core/network/proxy';
import {call, put, takeEvery} from 'redux-saga/effects';

import {apiGetCategory, apiGetProduct} from './api';
import {
  categoriesAction,
  productAction,
  setListCategories,
  setListProduct,
} from './reducer';
import {TCategoriesResponse, TProductResponse} from './type';

function* getCategorySaga(action: any) {
  if (!categoriesAction.match(action)) {
    return;
  }
  const {payload} = action;
  try {
    const response: Partial<TCategoriesResponse> = yield call(
      apiGetCategory,
      payload,
    );
    if (response?.errors) {
      yield handleError(response.errors);
      return;
    }
    if (response) {
      yield put(setListCategories(response));
    }
  } catch (error: any) {
    handleError(error);
  }
}

function* getProductSaga(action: any) {
  if (!productAction.match(action)) {
    return;
  }
  const {payload} = action;
  try {
    const response: Partial<TProductResponse> = yield call(
      apiGetProduct,
      payload,
    );
    if (response?.errors) {
      yield handleError(response.errors);
      return;
    }
    if (response) {
      yield put(setListProduct(response));
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(categoriesAction.type, getCategorySaga);
  yield takeEvery(productAction.type, getProductSaga);
}
