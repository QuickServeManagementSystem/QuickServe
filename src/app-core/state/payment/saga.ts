import {handleError} from '@app-core/network/proxy';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {call, takeEvery} from 'redux-saga/effects';

import {apiSubmitOrder, apiSubmitPaymentVNPay} from './api';
import {paymentOCDAction, paymentVNPayAction} from './reducer';
import {SubmitOrderResponse, TPaymentResponse} from './type';

function* createPaymentVNPaySaga(action: any) {
  if (!paymentVNPayAction.match(action)) {
    return;
  }

  try {
    const response: TPaymentResponse = yield call(
      apiSubmitPaymentVNPay,
      action.payload,
    );
    if (response.success) {
      Navigation.navigateTo(APP_SCREEN.WebViewPaymentVNPay.name, {
        url: response.data.paymentUrl,
      });
    }
  } catch (error: any) {
    handleError(error, '');
  }
}

function* createPaymentOCDSaga(action: any) {
  if (!paymentOCDAction.match(action)) {
    return;
  }
  try {
    const response: SubmitOrderResponse = yield call(
      apiSubmitOrder,
      action.payload,
    );
    if (response.success) {
      Navigation.navigateTo(APP_SCREEN.StatusOrder.name, {
        orderStatus: response.data,
      });
    }
  } catch (error: any) {
    handleError(error, '');
  }
}

export default function* () {
  yield takeEvery(paymentVNPayAction.type, createPaymentVNPaySaga);
  yield takeEvery(paymentOCDAction.type, createPaymentOCDSaga);
}
