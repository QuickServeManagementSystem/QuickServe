import {
  createSlice,
  createAction,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';

import {AppRootState} from '..';
import {AUTH_KEY, storageMMKV} from '../storage';

import {AuthBaseResponse, LoginResponseType} from './type';

export enum ERole {
  Staff = 'Staff',
  Admin = 'Admin',
  Customer = 'Customer',
  Store_Manager = 'Store_Manager',
  Brand_Manager = 'Brand_Manager',
  Guest = 'Guest',
}

type SliceState = {
  email: string;
  error: string;
  role?: ERole;
};

const initialState = {
  email: '',
  error: '',
  role: ERole.Guest,
} as SliceState;

const userStore = storageMMKV();
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // add reducers here
    setUserPreferences: (
      state: SliceState,
      {payload}: PayloadAction<Partial<{email: string; role: ERole}>>,
    ) => {
      if (payload.email) {
        state.email = payload.email;
      }
    },
    setRole: (state: SliceState, {payload}: PayloadAction<ERole>) => {
      state.role = payload;
    },
  },
});

export const userLoginAction = createAction<{
  email: string;
  password: string;
}>('user/login');

// actions
export const {setUserPreferences, setRole} = authSlice.actions;
// selectors
// export const handelLoading = (state: AppRootState) => state.auth.isLoading;
export const selectEmail = (state: AppRootState) => state.auth.email;
export const selectRole = (state: AppRootState) => state.auth.role;

export const selectUserPreferences = (state: AppRootState) => {
  const email = state.auth.email;
  userStore.create(email);
  return userStore;
};

export const selectCurrentRole = createSelector(
  selectUserPreferences,
  (store: ReturnType<typeof storageMMKV>) => {
    const currentAuth: UserAuth = store.getUserPreferences(AUTH_KEY);
    return currentAuth.data?.roles ? currentAuth.data?.roles : ERole.Guest;
  },
);

export type UserAuth = AuthBaseResponse<LoginResponseType> & {email: string};
export type UserPreferencesType = ReturnType<typeof storageMMKV>;

export default authSlice.reducer;
