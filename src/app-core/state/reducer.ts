import {combineReducers, Action} from '@reduxjs/toolkit';

import applicationReducer, {
  Slice as ApplicationSlice,
  resetStateAction,
} from './application/reducer';
import authReducer, {authSlice} from './auth/reducer';
import ingredientReducer, {ingredientSlice} from './ingredient/reducer';
import orderReducer, {orderSlice} from './order/reducer';
import paymentReducer, {paymentSlice} from './payment/reducer';
import productReducer, {productSlice} from './product/reducer';
import profileReducer, {profileSlice} from './profile/reducer';
import {DEFAULT_STORE_KEY, reduxStorage} from './storage';
import storeReducer, {storeSlice} from './store/reducer';

const appReducer = {
  [ApplicationSlice.name]: applicationReducer,
  [authSlice.name]: authReducer,
  [productSlice.name]: productReducer,
  [ingredientSlice.name]: ingredientReducer,
  [orderSlice.name]: orderReducer,
  [paymentSlice.name]: paymentReducer,
  [storeSlice.name]: storeReducer,
  [profileSlice.name]: profileReducer,
};

const appCombineReducer = combineReducers(appReducer);

// export type RootState = ReturnType<typeof rootReducer>;
export const rootReducer = (
  state: ReturnType<typeof appCombineReducer> | undefined,
  action: Action,
) => {
  if (resetStateAction.match(action)) {
    // for all keys defined in your persistConfig(s)
    reduxStorage.removeItem('persist:' + DEFAULT_STORE_KEY);
    // storage.removeItem('persist:otherKey')

    return appCombineReducer(undefined, action);
  }
  return appCombineReducer(state, action);
};

export type ReducerType = ReturnType<typeof rootReducer>;
export type ReducerName = keyof ReducerType;
