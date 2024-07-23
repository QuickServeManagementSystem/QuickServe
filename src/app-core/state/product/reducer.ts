import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';
import {BaseResType} from '../type';

import {
  TCategoriesRequest,
  TCategoriesResponse,
  TCategory,
  TProduct,
  TProductRequest,
  TProductResponse,
} from './type';

export enum ERole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  SuperUser = 'SuperUser',
  User = 'User',
}

type SliceState = {
  listCategories: BaseResType<TCategory>;
  listProduct: BaseResType<TProduct>;
};

const defaultCategories: TCategoriesResponse = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
};

const defaultProduct: TProductResponse = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
};

const initialState = {
  listCategories: defaultCategories,
  listProduct: defaultProduct,
} as SliceState;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setListCategories: (
      state: SliceState,
      {payload}: PayloadAction<Partial<TCategoriesResponse>>,
    ) => {
      if (payload?.data) {
        const {listCategories} = state;
        const {
          data,
          pageNumber = 1,
          totalPages = 0,
          totalItems = 0,
          pageSize = 10,
        } = payload;

        listCategories.data =
          pageNumber === 1 ? data : [...listCategories.data, ...data];

        //panigation
        listCategories.pageNumber = pageNumber;
        listCategories.totalPages = totalPages;
        listCategories.totalItems = totalItems;
        listCategories.pageSize = pageSize;
      }
    },
    setListProduct: (
      state: SliceState,
      {payload}: PayloadAction<Partial<TProductResponse>>,
    ) => {
      if (payload?.data) {
        const {listProduct} = state;
        const {
          data,
          pageNumber = 1,
          totalPages = 0,
          totalItems = 0,
          pageSize = 10,
        } = payload;
        listProduct.data =
          pageNumber === 1 ? data : [...listProduct.data, ...data];
        listProduct.pageNumber = pageNumber;
        listProduct.totalPages = totalPages;
        listProduct.totalItems = totalItems;
        listProduct.pageSize = pageSize;
      }
    },
  },
});

export const categoriesAction = createAction<TCategoriesRequest>(
  `${productSlice.name}/categories`,
);

export const productAction = createAction<TProductRequest>(
  `${productSlice.name}/product`,
);

// actions
export const {setListCategories, setListProduct} = productSlice.actions;
// selectors
export const getListCategories = (state: AppRootState) =>
  state.product.listCategories;

export const getListProruct = (state: AppRootState) =>
  state.product.listProduct;

export default productSlice.reducer;
