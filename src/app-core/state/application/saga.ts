import {handleError} from '@app-core/network/proxy';
import Navigation from '@navigation/Provider';
import {CONFIG} from '@utils/config';
import {REHYDRATE} from 'redux-persist';
import {
  call,
  all,
  put,
  takeEvery,
  select,
  delay,
  takeLatest,
} from 'redux-saga/effects';

import {
  launchAppAction,
  setLoading,
  updateApplication,
  firstLoadSelector,
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
    // if (authorizes.includes(authState)) {
    //   navigateReset('AppStack');
    //   if (appAuthorizes.includes(authState)) {
    //     yield call(loadInitialData);
    //   }
    // } else if (authState === AuthState.UNAUTHORIZED) {
    //   navigateReset('OnBoarding');
    // } else {
    //   // avoid app hang when auth state increases in the future
    //   navigateReset('AuthStack');
    // }
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

export default function* () {
  yield takeEvery(launchAppAction.type, launchApp);
  yield takeLatest(REHYDRATE, onRehydrateState);
}
