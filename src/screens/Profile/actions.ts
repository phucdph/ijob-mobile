import { createAction, createAsyncAction } from 'utils/redux';

export const { getUserProfile, getUserProfileSuccess, getUserProfileFail } = createAsyncAction(
  'getUserProfile',
  'GET_USER_PROFILE'
);

export const refreshUserProfile = createAction('REFRESH_USER_PROFILE');
