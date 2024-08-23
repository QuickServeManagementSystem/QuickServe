import {BaseResType} from '../type';

export type TStoreRequest = {
  pageNumber?: number;
  pageSize?: number;
};

export type TStore = {
  id: number;
  name: string;
  address: number;
  createdBy: string;
  created: number;
};

export type TStoreResponse = BaseResType<TStore>;
