import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {
  TGetBill,
  TGetFilterHistoryOrder,
  TGetFilterHistoryOrderStaff,
  TGetOrder,
  TGetOrderHistoryCustomer,
  TGetOrderHistoryStaff,
  TGetOrderRequest,
  TGetOrderResponse,
  TGetOrderStaffResponse,
  TGetStatusOrder,
  TOrderCustomerRequest,
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

export function* apiGetOrderStaff(
  param: TGetOrderRequest,
): Generator<any, TGetOrderStaffResponse, any> {
  const apiRequest = (token: string) => {
    const query = makeParam(param);
    return new apiClient(token).get(`v1/Orders/Staff/OrderStatus` + query);
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

export function* apiGetOrderHistoryCustomer(
  param: TGetFilterHistoryOrder,
): Generator<any, TGetOrderHistoryCustomer, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Orders/CustomerOrderHistory`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiCreateOrderCustomer(
  param: TOrderCustomerRequest,
): Generator<any, TOrderCustomerRequest, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).post(`v1/Orders/CreateOrderForCustomer`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetOrderHistoryStaff(
  param: TGetFilterHistoryOrderStaff,
): Generator<any, TGetOrderHistoryStaff, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Orders/Staff/OrderStatus`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetBillById(param: {
  orderId: string;
}): Generator<any, TGetBill, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Orders/PrintBill/` + param.orderId);
  };

  return yield call(apiCallProxy, apiRequest);
}
