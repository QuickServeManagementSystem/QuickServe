import {all} from 'redux-saga/effects';

import applicationSaga from './application/saga';

export function* rootSaga() {
  yield all([applicationSaga()]);
}
