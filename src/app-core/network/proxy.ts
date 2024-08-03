import {resetStateAction} from '@app-core/state/application/reducer';
import {
  UserAuth,
  UserPreferencesType,
  selectUserPreferences,
} from '@app-core/state/auth/reducer';
import {AUTH_KEY} from '@app-core/state/storage';
import {isNull} from '@utils/common';
import EventInstance from '@utils/eventInstance/eventInstance';
import {EventType} from '@utils/eventInstance/type';
import toast from '@utils/toast';
import cloneDeep from 'lodash/cloneDeep';
import {call, put, select} from 'redux-saga/effects';

// mocking test refresh token
// let shouldRefresh = true;
// let interval = setInterval(() => {
//   shouldRefresh = !shouldRefresh;
// }, 100000);

export function* apiCallProxy(execFunction: Function, ...args: any[]) {
  try {
    const userPref: UserPreferencesType = yield select(selectUserPreferences);
    const currentAuth: UserAuth = userPref.getUserPreferences(AUTH_KEY);
    // const accessToken: string = select(
    //   state: => state.auth.userAuth.data.accessToken,
    // );

    const accessToken = currentAuth?.data?.accessToken;

    // position arguments: function, param1, param2, ...
    const argumentsIncludeToken = cloneDeep(args);
    argumentsIncludeToken.splice(0, 0, accessToken);

    // Call api as normal
    // @ts-ignore
    return yield call(execFunction, argumentsIncludeToken);
  } catch (error: any) {
    console.log('API CALL PROXY');
    console.log('error axios', error);
    // deactived account error
    if (error && error?.status && error?.status === '401') {
    }

    if (error?.status === '401' && !error?.error?.code) {
      try {
        // Error 401 => Should refresh token
        yield put(resetStateAction());
      } catch (refreshError) {}
    }

    //
    if (
      error &&
      error?.status &&
      (error?.status === 403 || error?.status === '403')
    ) {
      // Error 401 => Should refresh token
      yield put(resetStateAction());
    }
    yield call(handleError, error);
  }
}

export function* handleError(e: any, defaultMsg: string = 'error') {
  let error = {
    errorCode: 0,
    message: '',
  };
  let errorCode = e?.errorCode as number;
  if (Array.isArray(e)) {
    for (let i = 0; i < e.length; i++) {
      if (e[i]?.errorCode) {
        error.errorCode = e[i]?.errorCode;
      }
      if (e[i]?.description) {
        error.message = e[i]?.description ? e[i]?.description : defaultMsg;
      }
    }
  }

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

  //set error code
  switch (error.errorCode || errorCode || e?.status) {
    case 15:
      EventInstance.emitEventListener(EventType.LOGIN_FAIL, {
        _error: e.message || error.message,
      });
      EventInstance.emitEventListener(EventType.LOADING, {
        _loading: false,
      });
      break;
    case 400:
      EventInstance.emitEventListener(EventType.LOGIN_FAIL, {
        _error: e.message || error.message,
      });
      EventInstance.emitEventListener(EventType.LOADING, {
        _loading: false,
      });
      break;
    default:
      break;
  }

  if (error.message === 'IGNORE') {
    return;
  }
  // statusCode: 400,
  // errorCode: 100001,
  // message: 'User not exist',
  // status: '400'
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
