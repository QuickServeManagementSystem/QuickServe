import {all} from 'redux-saga/effects';

import applicationSaga from './application/saga';
import authSaga from './auth/saga';
import ingredientSaga from './ingredient/saga';
import orderSaga from './order/saga';
import paymentSaga from './payment/saga';
import productSaga from './product/saga';

export function* rootSaga() {
  yield all([
    applicationSaga(),
    authSaga(),
    productSaga(),
    ingredientSaga(),
    orderSaga(),
    paymentSaga(),
  ]);
}
