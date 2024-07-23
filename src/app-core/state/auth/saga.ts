import {handleError} from '@app-core/network/proxy';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import EventInstance from '@utils/eventInstance/eventInstance';
import {EventType} from '@utils/eventInstance/type';
import {call, put, select, takeEvery} from 'redux-saga/effects';

import {AUTH_KEY} from '../storage';

import {requestAuth} from './api';
import {
  selectUserPreferences,
  setRole,
  setUserPreferences,
  userLoginAction,
  UserPreferencesType,
} from './reducer';
import {AuthBaseResponse, LoginResponseType} from './type';

function* loginAppSaga(action: any) {
  if (!userLoginAction.match(action)) {
    return;
  }
  const {payload} = action;
  try {
    /**
     * {"refreshToken": string, "role": "SuperAdmin", "token": string }
     */
    EventInstance.emitEventListener(EventType.LOADING, {
      _loading: true,
    });
    const response: Partial<AuthBaseResponse<LoginResponseType>> = yield call(
      requestAuth,
      payload,
    );

    if (response?.errors) {
      yield handleError(response.errors);
      return;
    }
    if (response) {
      yield put(setUserPreferences({email: payload.email}));
      const userStore: UserPreferencesType = yield select(
        selectUserPreferences,
      );
      yield put(setRole(response.data?.roles as any));
      userStore.setUserPreferences(AUTH_KEY, {
        ...response,
        email: payload.email,
      });
      // set Role to userStore ==> set Role to App, Router, ...

      Navigation.reset(APP_SCREEN.AppStack.name);
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(userLoginAction.type, loginAppSaga);
}
