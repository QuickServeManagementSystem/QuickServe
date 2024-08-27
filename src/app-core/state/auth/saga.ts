import {handleError} from '@app-core/network/proxy';
import {APP_SCREEN, AUTH_APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import EventInstance from '@utils/eventInstance/eventInstance';
import {EventType} from '@utils/eventInstance/type';
import toast from '@utils/toast';
import {call, put, select, takeEvery} from 'redux-saga/effects';

import {AUTH_KEY} from '../storage';

import {registerAccount, requestAuth} from './api';
import {
  registerAccountAction,
  selectUserPreferences,
  setRole,
  setUserPreferences,
  userLoginAction,
  UserPreferencesType,
} from './reducer';
import {
  AuthBaseResponse,
  LoginResponseType,
  RegisterResponseType,
} from './type';

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
      const role = response.data?.roles;

      if (role === 'Customer') {
        Navigation.reset(APP_SCREEN.StoreSelection.name);
      } else {
        Navigation.reset(APP_SCREEN.AppStack.name);
      }
    }
  } catch (error: any) {
    handleError(error);
  }
}

function* registerCutomerSaga(action: any) {
  if (!registerAccountAction.match(action)) {
    return;
  }
  try {
    const response: RegisterResponseType = yield call(
      registerAccount,
      action.payload,
    );

    if (response?.errors) {
      yield handleError(response.errors);
      return;
    }
    if (response) {
      Navigation.reset(AUTH_APP_SCREEN.SignIn.name);
      toast.success('Đăng ký thành công!');
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(userLoginAction.type, loginAppSaga);
  yield takeEvery(registerAccountAction.type, registerCutomerSaga);
}
