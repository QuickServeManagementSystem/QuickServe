import {combineReducers, Action} from '@reduxjs/toolkit';

import applicationReducer, {
  Slice as ApplicationSlice,
  resetStateAction,
} from './application/reducer';
import {reduxStorage} from './storage';
import todoReducer, {TodoSlice} from './todo/reducer';

const appReducer = {
  [ApplicationSlice.name]: applicationReducer,
  [TodoSlice.name]: todoReducer,
};

const appCombineReducer = combineReducers(appReducer);

// export type RootState = ReturnType<typeof rootReducer>;
export const rootReducer = (
  state: ReturnType<typeof appCombineReducer> | undefined,
  action: Action,
) => {
  if (resetStateAction.match(action)) {
    // for all keys defined in your persistConfig(s)
    reduxStorage.removeItem('persist:root');
    // storage.removeItem('persist:otherKey')

    return appCombineReducer(undefined, action);
  }
  return appCombineReducer(state, action);
};

export type ReducerType = ReturnType<typeof rootReducer>;
export type ReducerName = keyof ReducerType;
