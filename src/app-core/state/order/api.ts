import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {
  TGetOrder,
  TGetOrderRequest,
  TGetOrderResponse,
  TOrderRequest,
  TOrderResponse,
  TUpdateOrder,
} from './type';

export function* apiCreateOrder(
  param: TOrderRequest,
): Generator<any, TOrderResponse, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).post(`v1/Orders/CreateOrder`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetOrder(
  param: TGetOrderRequest,
): Generator<any, TGetOrderResponse, any> {
  const apiRequest = (token: string) => {
    const query = makeParam(param);
    return new apiClient(token).get(`v1/Orders` + query);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiUpdateOrder(
  param: TUpdateOrder,
): Generator<any, TOrderResponse, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).put(`v1/Orders/UpdateOrderStatus`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetOrderById(param: {
  orderId: string;
}): Generator<any, TGetOrder, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Orders/` + param.orderId);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetStatusOrder(): Generator<any, any, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Orders/Store/OrderStatus`);
  };

  return yield call(apiCallProxy, apiRequest);
}
