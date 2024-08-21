import {createSlice, createAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';
import {BaseResType} from '../type';

import {
  TGetOrder,
  TGetOrderByIdRequest,
  TGetOrderHistoryCustomerResponse,
  TGetOrderHistoryStaffResponse,
  TGetOrderRequest,
  TGetOrderResponse,
  TGetOrderStaffResponse,
  TGetStatusOrderResponse,
  TOrderCustomerRequest,
  TOrderRequest,
  TOrderResponse,
  TUpdateOrder,
} from './type';

const defaultOrder: TOrderResponse = {
  success: true,
  errors: [
    {
      errorCode: 0,
      fieldName: '',
      description: '',
    },
  ],
  data: {
    orderId: '',
    status: 0,
  },
};
const defaultGetOrderResponse: TGetOrderResponse = {
  success: true,
  errors: [
    {
      errorCode: 0,
      fieldName: '',
      description: '',
    },
  ],
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
};

const listStatusDefault: TGetStatusOrderResponse = {
  success: true,
  data: [],
  errors: [
    {
      errorCode: 0,
      fieldName: '',
      description: '',
    },
  ],
  pageNumber: 0,
  pageSize: 0,
  totalPages: 0,
  totalItems: 0,
};

type SliceState = {
  order: TOrderResponse;
  listOrder: TGetOrderResponse;
  listOrderStaff: TGetOrderStaffResponse;
  detailOrder: TGetOrder;
  listStatusOrder: TGetStatusOrderResponse;
  listOrderHistory: TGetOrderHistoryCustomerResponse;
  listOrderHistoryStaff: TGetOrderHistoryStaffResponse;
};

const initialState = {
  order: defaultOrder,
  listOrder: defaultGetOrderResponse,
  listOrderStaff: listStatusDefault,
  detailOrder: {},
  listStatusOrder: listStatusDefault,
} as SliceState;

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state: SliceState, {payload}: {payload: TOrderResponse}) => {
      state.order = payload;
    },

    setStatusOrder: (
      state: SliceState,
      {payload}: {payload: TGetStatusOrderResponse},
    ) => {
      state.listStatusOrder = payload;
    },

    updateStatusOrder: (
      state: SliceState,
      {payload}: {payload: TUpdateOrder},
    ) => {
      const index = state.listOrder.data.findIndex(
        item => item.id === payload.orderId,
      );
      if (index !== -1) {
        state.listOrder.data[index].status = payload.status;
      } else {
        state.detailOrder.status = payload.status;
      }
    },

    setListOrder: (
      state: SliceState,
      {payload}: {payload: TGetOrderResponse},
    ) => {
      if (payload?.data) {
        const {listOrder} = state;
        const {
          data,
          pageNumber = 1,
          totalPages = 0,
          totalItems = 0,
          pageSize = 20,
        } = payload;

        listOrder.data = pageNumber === 1 ? data : [...listOrder.data, ...data];

        //panigation
        listOrder.pageNumber = pageNumber;
        listOrder.totalPages = totalPages;
        listOrder.totalItems = totalItems;
        listOrder.pageSize = pageSize;
      }
    },
    setListOrderStaff: (
      state: SliceState,
      {payload}: {payload: TGetOrderStaffResponse},
    ) => {
      if (payload?.data) {
        const {listOrderStaff} = state;
        const {
          data,
          pageNumber = 1,
          totalPages = 0,
          totalItems = 0,
          pageSize = 20,
        } = payload;

        listOrderStaff.data =
          pageNumber === 1 ? data : [...listOrderStaff.data, ...data];

        //panigation
        listOrderStaff.pageNumber = pageNumber;
        listOrderStaff.totalPages = totalPages;
        listOrderStaff.totalItems = totalItems;
        listOrderStaff.pageSize = pageSize;
      }
    },
    setListOrderHistory: (
      state: SliceState,
      {payload}: {payload: TGetOrderHistoryCustomerResponse},
    ) => {
      state.listOrderHistory = payload;
    },
    setListOrderHistoryStaff: (
      state: SliceState,
      {payload}: {payload: TGetOrderHistoryStaffResponse},
    ) => {
      state.listOrderHistoryStaff = payload;
    },
    setDetailOrder: (state: SliceState, {payload}: {payload: any}) => {
      state.detailOrder = payload;
    },
  },
});

export const {
  setOrder,
  setListOrder,
  setListOrderStaff,
  setDetailOrder,
  setStatusOrder,
  updateStatusOrder,
  setListOrderHistory,
  setListOrderHistoryStaff,
} = orderSlice.actions;

export const createOrderAction = createAction<TOrderRequest>(
  `${orderSlice.name}/orderAction`,
);

export const getListOrderAction = createAction<TGetOrderRequest>(
  `${orderSlice.name}/getListOrderAction`,
);

export const updateOrderAction = createAction<TUpdateOrder>(
  `${orderSlice.name}/updateOrderAction`,
);
export const getOrderByIdAction = createAction<TGetOrderByIdRequest>(
  `${orderSlice.name}/getOrderByIdAction`,
);

export const getListStatusOrderAction = createAction(
  `${orderSlice.name}/getListStatusOrderAction`,
);

export const getListOrderHistoryAction = createAction(
  `${orderSlice.name}/getListOrderHistoryAction`,
  ({selectedStore, last7Days, selectedStatus}) => ({
    payload: {selectedStore, last7Days, selectedStatus},
  }),
);

export const createOrderCustomerAction = createAction<TOrderCustomerRequest>(
  `${orderSlice.name}/orderCustomerAction`,
);
export const getListOrderHistoryStaffAction = createAction(
  `${orderSlice.name}/getListOrderHistoryStaffAction`,
  ({selectedStatus}) => ({
    payload: {selectedStatus},
  }),
);
export const getListOrderStaffAction = createAction(
  `${orderSlice.name}/getListOrderStaffAction`,
);
//selectors

export const selectOrder = (state: AppRootState) => state.order.order;
export const selectListOrder = (state: AppRootState) => state.order.listOrder;

export const selectListOrderStaff = (state: AppRootState) =>
  state.order.listOrderStaff;

export const selectOrderByIdSelector = (state: AppRootState) =>
  state.order.detailOrder;

export const selectStatusOrderSelector = (state: AppRootState) =>
  state.order.listStatusOrder;

export const selectListOrderHistorySelector = (state: AppRootState) =>
  state.order.listOrderHistory;

export const selectListOrderHistoryStaffSelector = (state: AppRootState) =>
  state.order.listOrderHistoryStaff;

export default orderSlice.reducer;
