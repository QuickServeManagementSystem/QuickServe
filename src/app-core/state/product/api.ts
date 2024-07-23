import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {
  TCategoriesRequest,
  TCategoriesResponse,
  TProductIngredient,
  TProductRequest,
  TProductResponse,
} from './type';

export function* apiGetCategory(
  param: TCategoriesRequest,
): Generator<any, Partial<TCategoriesResponse>, any> {
  const newParam = {
    ...param,
  };

  const queries = makeParam(newParam);
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Categories/paged` + queries);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetProduct(
  param: TProductRequest,
): Generator<any, Partial<TProductResponse>, any> {
  const newParam = {
    ...param,
  };

  const queries = makeParam(newParam);
  const apiRequest = (token: string) => {
    return new apiClient(token).get(
      `v1/ProductTemplates/pagedByActiveStatus` + queries,
    );
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* apiGetProductDetail(
  param: TProductIngredient,
): Generator<any, Partial<TProductResponse>, any> {
  const newParams = Object.assign(param);

  const apiRequest = (token: string) => {
    return new apiClient(token).get(
      `v1//IngredientTypeTemplateSteps/all` + newParams,
    );
  };

  return yield call(apiCallProxy, apiRequest);
}
