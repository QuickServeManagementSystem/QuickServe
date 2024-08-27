import {BaseResType} from '../type';

export interface TCategoriesRequest {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface TProductRequest {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
  storeId?: number;
}

export interface TProductIngredient {
  productTemplateId: number;
}

export interface TProduct {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  size: string;
  status: number;
  imageUrl: string;
  calo: number;
  price: number;
  description: string;
  createdBy: string;
  created: string;
  lastModifiedBy: string;
  lastModified: string;
  category: {
    id: number;
    name: string;
    status: number;
  };
}

export interface TCategory {
  id: number;
  name: string;
  status: number;
  createdBy: string;
  created: string;
  lastModifiedBy: string;
  lastModified: string;
}

export type TCategoriesResponse = BaseResType<TCategory>;
export type TProductResponse = BaseResType<TProduct>;
