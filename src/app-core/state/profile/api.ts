import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {TProfileResponse} from './type';

export function* apiGetProfile(): Generator<any, TProfileResponse, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).get(`v1/Accounts/profile`);
  };

  return yield call(apiCallProxy, apiRequest);
}
