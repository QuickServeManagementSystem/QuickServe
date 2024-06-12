import {isNull} from '@utils/common';
import cloneDeep from 'lodash/cloneDeep';

import {ResponseData} from './interceptor';

// mocking test refresh token
let shouldRefresh = true;
let interval = setInterval(() => {
  shouldRefresh = !shouldRefresh;
}, 100000);

export function* apiCallProxy(execFunction: Function, ...args: any[]) {
  try {
    // const accessToken: string = select(
    //   state => state.authentication?.tokenData?.accessToken,
    // );
    const accessToken = 'accessToken';

    // position arguments: function, param1, param2, ...
    const argumentsIncludeToken = cloneDeep(args);
    argumentsIncludeToken.splice(0, 0, accessToken);

    // Call api as normal
    // @ts-ignore
    return yield execFunction(...argumentsIncludeToken);
  } catch (error: any) {
    console.log('API CALL PROXY');
    console.log('error axios', error);
    // deactived account error
    if (error && error?.status && error?.status === '401') {
    }

    if (error?.status === '401' && !error?.error?.code) {
      try {
      } catch (refreshError) {}
      // Error 401 => Should refresh token
    }

    //
    if (
      error &&
      error?.status &&
      (error?.status === 403 || error?.status === '403')
    ) {
      // Error 401 => Should refresh token
    }
    throw error;
  }
}

export function* handleError(
  e: any,
  defaultMsg: string,
  autoHide: boolean = false,
) {
  // case normal
  let messageError =
    e?.errorDescription ?? e?.message ?? e?.error ?? defaultMsg;
  // case 400
  // if (e?.status >= 400 && e?.status < 500 && e?.data?.length) {
  //   messageError = e?.data.reduce((str: string, nextError: any) => {
  //     return str + `${nextError?.message}` + '\n';
  //   }, '');
  // }

  // case 500
  // if (e?.status >= 500 && e?.message?.length) {
  //   messageError = e?.message.reduce((str: string, nextError: any) => {
  //     return str + `${nextError}` + '\n';
  //   }, '');
  // }

  if (messageError === 'IGNORE') {
    return;
  }
}

export const makeParam = (params: any) => {
  const paramObject = {
    ...params,
  };

  let paramList: string[] = [];
  for (let key in paramObject) {
    const value = paramObject[key];
    if (!isNull(value)) {
      if (Array.isArray(value)) {
        paramList.push(key + '=' + encodeURIComponent(JSON.stringify(value)));
      } else {
        paramList.push(key + '=' + encodeURIComponent(paramObject[key]));
      }
    }
  }
  let paramStr = paramList.reduce((currentValue, item, index) => {
    let nextValue =
      index === 0 ? currentValue + item : currentValue + '&' + item;
    return nextValue;
  }, '?');

  return paramStr.length !== 1 ? paramStr : '';
};

export const getParams = (payload?: {[key in string]: any}) => {
  let params = '';
  if (payload) {
    const paramsMapper = Object.keys(payload).map(
      key => `${key}=${encodeURIComponent(payload[key])}`,
    );
    params = `?${paramsMapper?.join('&')}`;
  }
  return params;
};
