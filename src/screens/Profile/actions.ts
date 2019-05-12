import { createAction, createAsyncAction } from 'utils/redux';

export const { getUserProfile, getUserProfileSuccess, getUserProfileFail } = createAsyncAction(
  'getUserProfile',
  'GET_USER_PROFILE'
);

export const { updateUserProfile, updateUserProfileSuccess, updateUserProfileFail } = createAsyncAction(
  'updateUserProfile',
  'UPDATE_USER_PROFILE'
);

export const { updateUserAvatar, updateUserAvatarSuccess, updateUserAvatarFail } = createAsyncAction(
  'updateUserAvatar',
  'UPDATE_USER_AVATAR'
);

export const refreshUserProfile = createAction('REFRESH_USER_PROFILE');
