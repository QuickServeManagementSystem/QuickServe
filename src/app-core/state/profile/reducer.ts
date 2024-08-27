import {createSlice, createAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';

import {TProfile} from './type';

type SliceState = {
  profileData: TProfile;
};

const initialState = {
  profileData: {},
} as SliceState;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state: SliceState, {payload}: {payload: any}) => {
      state.profileData = payload;
    },
  },
});

export const {setProfile} = profileSlice.actions;
// actions
export const getProfileAction = createAction(
  `${profileSlice.name}/getProfileAction`,
);

// selectors
export const selectedProfileStore = (state: AppRootState) =>
  state.profile.profileData;

export default profileSlice.reducer;
