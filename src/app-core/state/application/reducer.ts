import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import type {AppRootState} from '../index';

type SliceState = {
  isFirstLoad: boolean;
  isLoading: boolean;
};

// Define the initial state using that type
const initialState = {
  isFirstLoad: true,
  isLoading: false,
} as SliceState;

export const Slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateApplication: (
      state: SliceState,
      {payload}: PayloadAction<Partial<SliceState>>,
    ) => {
      Object.keys(payload).forEach(key => {
        const adaptValue = payload[key as keyof SliceState];
        if (adaptValue) {
          state[key as keyof SliceState] = adaptValue;
        }
      });
    },
    setLoading: (state: SliceState, {payload}: {payload: boolean}) => {
      state.isLoading = payload;
    },
  },
});

export const launchAppAction = createAction('application/launchAppAction');
export const resetStateAction = createAction('application/resetStateAction');
// actions
export const {setLoading, updateApplication} = Slice.actions;
// selectors
export const loadingSelector = (state: AppRootState) =>
  state.application.isLoading;
export const firstLoadSelector = (state: AppRootState) =>
  state.application.isFirstLoad;

export default Slice.reducer;
