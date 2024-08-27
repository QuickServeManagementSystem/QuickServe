import {handleError} from '@app-core/network/proxy';
import toast from '@utils/toast';
import {call, put, takeEvery} from 'redux-saga/effects';

import {apiGetProfile} from './api';
import {getProfileAction, setProfile} from './reducer';
import {TProfileResponse} from './type';

function* getProfileSaga(action: any) {
  if (!getProfileAction.match(action)) {
    return;
  }
  try {
    const response: TProfileResponse = yield call(
      apiGetProfile,
      action.payload,
    );
    if (response.success) {
      yield put(setProfile(response.data));
    }

    if (response.errors) {
      toast.error(response.errors?.[0].description ?? '');
    }
  } catch (error: any) {
    toast.error(error?.errors?.[0].description ?? '');
    handleError(error, '');
  }
}

export default function* () {
  yield takeEvery(getProfileAction.type, getProfileSaga);
}
