import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {TIngredient, TIngredientRequest} from './type';

export function* apiGetIngedientById(
  param: TIngredientRequest,
): Generator<any, Partial<TIngredient>, any> {
  const newParams = {
    ...param,
  };
  const queries = makeParam(newParams);

  const apiRequest = (token: string) => {
    return new apiClient(token).get(
      `v1/IngredientTypeTemplateSteps/all` + queries,
    );
  };

  return yield call(apiCallProxy, apiRequest);
}
