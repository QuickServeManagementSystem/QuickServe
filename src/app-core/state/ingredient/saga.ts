import {handleError} from '@app-core/network/proxy';
import {call, put, takeEvery} from 'redux-saga/effects';

import {apiGetIngedientById} from './api';
import {
  getIngredientByIdAction,
  setListIngredient,
  setListIngredientTypes,
} from './reducer';
import {TIngredient, parceIngredientType} from './type';

function* getIngredientByIdSaga(action: any) {
  if (!getIngredientByIdAction.match(action)) {
    return;
  }
  const {payload} = action;
  try {
    const {data}: {data: TIngredient} = yield call(
      apiGetIngedientById,
      payload,
    );
    if (data) {
      const ingredientType = parceIngredientType(data);
      yield put(setListIngredient(data));

      yield put(setListIngredientTypes(ingredientType));
      // parce data type
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(getIngredientByIdAction.type, getIngredientByIdSaga);
}
