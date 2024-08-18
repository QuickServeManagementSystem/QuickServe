import {handleError} from '@app-core/network/proxy';
import {en} from '@assets/text_constant';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import toast from '@utils/toast';
import {call, delay, put, takeEvery} from 'redux-saga/effects';

import {BaseResType, BaseResTypeSingle} from '../type';

import {
  apiCreateOrder,
  apiCreateOrderCustomer,
  apiGetOrder,
  apiGetOrderById,
  apiGetOrderHistoryCustomer,
  apiGetOrderHistoryStaff,
  apiGetStatusOrder,
  apiUpdateOrder,
} from './api';
import {
  createOrderAction,
  createOrderCustomerAction,
  getListOrderAction,
  getListOrderHistoryAction,
  getListOrderHistoryStaffAction,
  getListStatusOrderAction,
  getOrderByIdAction,
  setDetailOrder,
  setListOrder,
  setListOrderHistory,
  setListOrderHistoryStaff,
  setOrder,
  setStatusOrder,
  updateOrderAction,
  updateStatusOrder,
} from './reducer';
import {
  TGetOrder,
  TGetOrderHistoryCustomer,
  TGetOrderHistoryCustomerResponse,
  TGetOrderHistoryStaffResponse,
  TGetOrderResponse,
  TGetStatusOrderResponse,
  TOrderResponse,
} from './type';

function* createOrderSaga(action: any) {
  if (!createOrderAction.match(action)) {
    return;
  }
  try {
    const response: TOrderResponse = yield call(apiCreateOrder, action.payload);
    if (response.success) {
      toast.success(en.order.success);
      Navigation.navigateTo(APP_SCREEN.Payment.name, {
        orderId: response.data.orderId.toString(),
      });
      yield put(setOrder(response));
    }
    if (!response.success) {
      toast.error(response.errors?.[0].description ?? '');
      Navigation.replace(APP_SCREEN.HomeStack.name);
    }
  } catch (error: any) {
    toast.error(error.errors?.[0]?.description);
    handleError(error);
  }
}

function* getListORderSaga(action: any): Generator<any, void, any> {
  if (!getListOrderAction.match(action)) {
    return;
  }
  try {
    const response: TGetOrderResponse = yield call(apiGetOrder, action.payload);
    if (response) {
      yield put(setListOrder(response));
    }
    if (response.errors) {
      toast.error(en.order.error);
      Navigation.replace(APP_SCREEN.AppStack.name);
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}
function* UpdateOrderStatusSaga(action: any) {
  if (!updateOrderAction.match(action)) {
    return;
  }
  try {
    const response: TOrderResponse = yield call(apiUpdateOrder, action.payload);
    if (response.success) {
      yield put(updateStatusOrder(response.data));
    } else {
      toast.success('Thay đổi trạng thái không thành công');
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}

function* getOrderByIdSaga(action: any) {
  if (!getOrderByIdAction.match(action)) {
    return;
  }
  const currentRoute = Navigation.getRef().current?.getCurrentRoute()?.name;

  try {
    const response: BaseResTypeSingle<TGetOrder> = yield call(apiGetOrderById, {
      orderId: action.payload.orderId,
    });
    yield put(setDetailOrder(response.data));
    if (
      response.data.status === 3 &&
      currentRoute === APP_SCREEN.StatusOrder.name
    ) {
      yield delay(5000);
      Navigation.replace(APP_SCREEN.AppStack.name);
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}

function* getOrderStatusSaga(action: any) {
  if (!getListStatusOrderAction.match(action)) {
    return;
  }
  try {
    const response: TGetStatusOrderResponse = yield call(apiGetStatusOrder);
    if (response.success) {
      yield put(setStatusOrder(response));
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}

function* getOrderHistoryCustomer(action: any) {
  if (!getListOrderHistoryAction.match(action)) {
    return;
  }
  try {
    const {selectedStore, last7Days, selectedStatus} = action.payload;
    const params = {
      StoreName: selectedStore,
      Last7Days: last7Days,
      Status: selectedStatus,
    };
    const response: TGetOrderHistoryCustomerResponse = yield call(
      apiGetOrderHistoryCustomer,
      params,
    );
    if (response.success) {
      yield put(setListOrderHistory(response));
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}

function* createOrderCustomerSaga(action: any) {
  if (!createOrderCustomerAction.match(action)) {
    return;
  }
  try {
    const response: TOrderResponse = yield call(
      apiCreateOrderCustomer,
      action.payload,
    );
    if (response.success) {
      toast.success(en.order.success);
      Navigation.navigateTo(APP_SCREEN.Payment.name, {
        orderId: response.data.orderId.toString(),
      });
      yield put(setOrder(response));
    }
    if (!response.success) {
      toast.error(response.errors?.[0].description ?? '');
      Navigation.replace(APP_SCREEN.HomeStack.name);
    }
  } catch (error: any) {
    toast.error(error.errors?.[0]?.description);
    handleError(error);
  }
}

function* getOrderHistoryStaff(action: any) {
  if (!getListOrderHistoryStaffAction.match(action)) {
    return;
  }
  try {
    const {selectedStatus} = action.payload;
    const params = {
      Status: selectedStatus,
    };
    const response: TGetOrderHistoryStaffResponse = yield call(
      apiGetOrderHistoryStaff,
      params,
    );
    if (response.success) {
      yield put(setListOrderHistoryStaff(response));
    }
  } catch (error: any) {
    toast.error(en.order.error);
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(createOrderAction.type, createOrderSaga);
  yield takeEvery(getListOrderAction.type, getListORderSaga);
  yield takeEvery(updateOrderAction.type, UpdateOrderStatusSaga);
  yield takeEvery(getOrderByIdAction.type, getOrderByIdSaga);
  yield takeEvery(getListStatusOrderAction.type, getOrderStatusSaga);
  yield takeEvery(getListOrderHistoryAction.type, getOrderHistoryCustomer);
  yield takeEvery(createOrderCustomerAction.type, createOrderCustomerSaga);
  yield takeEvery(getListOrderHistoryStaffAction.type, getOrderHistoryStaff);
}
