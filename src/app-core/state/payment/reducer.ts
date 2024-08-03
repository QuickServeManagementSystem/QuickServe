import {createAction, createSlice} from '@reduxjs/toolkit';

import {TCreateVNPayRequest} from './type';

type SliceState = {};

const initialState = {} as SliceState;

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
});

export const {} = paymentSlice.actions;

export const paymentVNPayOSAction = createAction<TCreateVNPayRequest>(
  `${paymentSlice.name}/paymentVNPayOSAction`,
);

export const paymentOCDAction = createAction<TCreateVNPayRequest>(
  `${paymentSlice.name}/paymentOCDAction`,
);

//selectors

export default paymentSlice.reducer;
