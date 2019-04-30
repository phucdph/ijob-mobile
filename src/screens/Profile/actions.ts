import { createAsyncAction } from 'utils/redux';

export const { getUserProfile, getUserProfileSuccess, getUserProfileFail } = createAsyncAction(
  'getUserProfile',
  'GET_USER_PROFILE'
);
