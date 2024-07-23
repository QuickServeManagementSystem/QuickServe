import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {
  SubmitOrderResponse,
  TCreateVNPayRequest,
  TPaymentResponse,
  TSubmitOrderRequest,
} from './type';

export function* apiSubmitOrder(
  param: TSubmitOrderRequest,
): Generator<any, SubmitOrderResponse, any> {
  const apiRequest = (token: string) => {
    const orderId = param.orderId;

    param.orderId = '';
    return new apiClient(token).post(
      `v1/Payments/submit-order/` + orderId,
      param,
    );
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiSubmitPaymentVNPay(
  param: TCreateVNPayRequest,
): Generator<any, TPaymentResponse, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).post(`v1/Payments/CreateVNPayPayment`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}
