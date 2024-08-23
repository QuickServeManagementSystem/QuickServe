import {handleError} from '@app-core/network/proxy';
import {call, put, takeEvery} from 'redux-saga/effects';

import {apiGetStore} from './api';
import {getListStoreAction, setListStore} from './reducer';
import {TStoreResponse} from './type';

function* getStoreSaga(action: any) {
  if (!getListStoreAction.match(action)) {
    return;
  }
  const {payload} = action;
  try {
    const response: TStoreResponse = yield call(apiGetStore, payload);
    if (response?.errors) {
      yield handleError(response.errors);
      return;
    }
    if (response) {
      yield put(setListStore(response));
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(getListStoreAction.type, getStoreSaga);
}
