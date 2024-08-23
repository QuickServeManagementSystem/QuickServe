import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';
import {storageMMKV} from '../storage';

const userStore = storageMMKV();

import {TStoreRequest, TStoreResponse} from './type';

type SliceState = {
  listStore: TStoreResponse;
  selectedStoreId: number;
};
const defaultStoreReponse: TStoreResponse = {
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
const initialState = {
  listStore: defaultStoreReponse,
  selectedStoreId: userStore.getSelectedStoreId() || 0,
} as SliceState;

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setListStore: (state: SliceState, {payload}: {payload: TStoreResponse}) => {
      if (payload?.data) {
        const {listStore} = state;
        const {data, pageNumber = 1, pageSize = 10} = payload;

        listStore.data = pageNumber === 1 ? data : [...listStore.data, ...data];

        //panigation
        listStore.pageNumber = pageNumber;
        listStore.pageSize = pageSize;
      }
    },
    setSelectedStoreId: (
      state: SliceState,
      {payload}: PayloadAction<number>,
    ) => {
      state.selectedStoreId = payload;
      userStore.setSelectedStoreId(payload);
    },
  },
});

export const {setListStore, setSelectedStoreId} = storeSlice.actions;
// actions
export const getListStoreAction = createAction<TStoreRequest>(
  `${storeSlice.name}/getListStoreAction`,
);

// selectors
export const selectedListStore = (state: AppRootState) => state.store.listStore;
export const selectSelectedStoreId = (state: AppRootState) =>
  state.store.selectedStoreId;

export default storeSlice.reducer;
