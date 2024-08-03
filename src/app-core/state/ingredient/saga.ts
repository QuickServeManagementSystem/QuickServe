import {handleError} from '@app-core/network/proxy';
import {call, put, takeEvery} from 'redux-saga/effects';

import {apiGetIngedientById} from './api';
import {
  getIngredientByIdAction,
  setListIngredient,
  setListIngredientTypes,
  setStepList,
} from './reducer';
import {Step, TIngredient, parceIngredientType, transformData} from './type';

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
      const stepIngredient: Step[] = transformData(data);
      yield put(setStepList(stepIngredient));
    }
  } catch (error: any) {
    handleError(error);
  }
}

export default function* () {
  yield takeEvery(getIngredientByIdAction.type, getIngredientByIdSaga);
}
