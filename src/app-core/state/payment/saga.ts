import {handleError} from '@app-core/network/proxy';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import toast from '@utils/toast';
import {call, takeEvery} from 'redux-saga/effects';

import {apiSubmitOrder, apiSubmitPaymentOS} from './api';
import {paymentOCDAction, paymentVNPayOSAction} from './reducer';
import {SubmitOrderResponse, TPaymentResponse} from './type';

function* createPaymentOSSaga(action: any) {
  if (!paymentVNPayOSAction.match(action)) {
    return;
  }

  try {
    if (action.payload.totalPrice === 0) {
      return toast.error('Số tiền phải lớn hơn hoặc bằng 0.01');
    }
    const response: TPaymentResponse = yield call(
      apiSubmitPaymentOS,
      action.payload,
    );

    if (response.success) {
      Navigation.navigateTo(APP_SCREEN.WebViewPaymentVNPay.name, {
        url: response.data.paymentUrl,
      });
    }
    if (response.errors) {
      toast.error(response.errors?.[0].description ?? '');
    }
  } catch (error: any) {
    toast.error(error?.errors?.[0].description ?? '');
    handleError(error, '');
  }
}

function* createPaymentOCDSaga(action: any) {
  if (!paymentOCDAction.match(action)) {
    return;
  }
  try {
    if (action.payload.totalPrice === 0) {
      return toast.error('Số tiền phải lớn hơn hoặc bằng 0.01');
    }
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
  yield takeEvery(paymentVNPayOSAction.type, createPaymentOSSaga);
  yield takeEvery(paymentOCDAction.type, createPaymentOCDSaga);
}
