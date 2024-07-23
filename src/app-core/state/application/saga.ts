import {handleError} from '@app-core/network/proxy';
import {APP_SCREEN, AUTH_APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {REHYDRATE} from 'redux-persist';
import {
  call,
  put,
  takeEvery,
  select,
  delay,
  takeLatest,
} from 'redux-saga/effects';

import {
  selectUserPreferences,
  UserPreferencesType,
  UserAuth,
} from '../auth/reducer';
import {AUTH_KEY} from '../storage';

import {
  launchAppAction,
  setLoading,
  updateApplication,
  firstLoadSelector,
  resetStateAction,
} from './reducer';

function* loadInitialData() {
  try {
    // const response = yield call(getMyProfile);
    // if (response?.data) {
    //   yield put(
    //     updateUserProfile({
    //       myProfile: response?.data,
    //     }),
    //   );
    // }
    // yield put(getPrivacySettings());
  } catch (error) {
    yield error;
  }
}

function* configWhenAppFirstLaunch() {
  // dosomething here for first installed app
  // it should call first time app launch
  yield put(
    updateApplication({
      isFirstLoad: false,
    }),
  );
  //
}

function* launchApp(action: any) {
  if (!launchAppAction.match(action)) {
    return;
  }

  const isFirstLoad: boolean = yield select(firstLoadSelector);
  if (isFirstLoad) {
    yield configWhenAppFirstLaunch();
    yield delay(500);
  }

  yield put(setLoading(false));
  try {
    yield delay(2000);
  } catch (error) {
    yield call(handleError, error, '');
  } finally {
    const userPref: UserPreferencesType = yield select(selectUserPreferences);
    const currentAuth: UserAuth = userPref.getUserPreferences(AUTH_KEY);
    console.log('currentAuth', currentAuth);
    if (currentAuth.email && currentAuth.data.accessToken) {
      Navigation.reset(APP_SCREEN.AppStack.name);
    } else {
      Navigation.reset(APP_SCREEN.AuthStack.name);
    }
  }
}

function* onRehydrateState(action: any) {
  try {
    if (action.type === REHYDRATE) {
    }
  } catch (error) {
    yield call(handleError, error, '');
  } finally {
  }
}

function* resetStateHandler(action: any) {
  try {
    if (!resetStateAction.match(action)) {
      return;
    }
    const currentRoute = Navigation.getRef().current?.getCurrentRoute()?.name;
    if (
      currentRoute &&
      currentRoute !== AUTH_APP_SCREEN.SignIn.name &&
      currentRoute !== APP_SCREEN.Splash.name
    ) {
      Navigation.reset(APP_SCREEN.AuthStack.name);
    }
    Navigation.reset(APP_SCREEN.AuthStack.name);
    // const response = yield call(getMyProfile);
    // if (response?.data) {
    //   yield put(
    //     updateUserProfile({
    //       myProfile: response?.data,
    //     }),
    //   );
    // }
    // yield put(getPrivacySettings());
  } catch (error) {
    yield error;
  }
}

export default function* () {
  yield takeEvery(launchAppAction.type, launchApp);
  yield takeLatest(REHYDRATE, onRehydrateState);
  yield takeLatest(resetStateAction.type, resetStateHandler);
}
