import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {TStoreRequest, TStoreResponse} from './type';

export function* apiGetStore(
  param: TStoreRequest,
): Generator<any, TStoreResponse, any> {
  const queries = makeParam(param);
  const apiRequest = () => {
    return new apiClient().get(`v1/Stores/paged` + queries);
  };

  return yield call(apiCallProxy, apiRequest);
}
