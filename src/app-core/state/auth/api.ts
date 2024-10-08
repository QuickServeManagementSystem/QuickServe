import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

import {
  AuthBaseResponse,
  LoginRequest,
  LoginResponseType,
  RegisterRequest,
  RegisterResponseType,
} from './type';

export function* requestAuth(
  param: LoginRequest,
): Generator<any, Partial<AuthBaseResponse<LoginResponseType>>, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).post(`v1/Accounts/authenticate`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}

export function* registerAccount(
  param: RegisterRequest,
): Generator<any, RegisterResponseType, any> {
  const apiRequest = (token: string) => {
    return new apiClient(token).post(`v1/Accounts/customer`, param);
  };

  return yield call(apiCallProxy, apiRequest);
}
