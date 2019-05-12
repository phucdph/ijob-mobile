import { createSagas } from 'utils/redux';
import {
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFail,
  refreshUserProfile,
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFail,
  updateUserAvatar,
  updateUserAvatarSuccess,
  updateUserAvatarFail
} from './actions';
import { call, put, delay, select } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { userService } from './services/userService';
import { IUser } from './services/typings';
import { currentProfileSelector } from './selectors';
import { cloudiaryService } from 'services/cloudiaryService';

const getUserProfileSaga = {
  on: [getUserProfile, refreshUserProfile],
  *worker(action: Action<string>) {
    try {
      const res = yield call(userService.getMyProfile);
      yield delay(1000);
      yield put(getUserProfileSuccess(res));
    } catch (err) {
      yield put(getUserProfileFail(err));
    }
  }
};

const updateUserProfileSaga = {
  on: updateUserProfile,
  *worker(action: Action<IUser>) {
    try {
      const res = yield call(userService.update, action.payload);
      yield put(updateUserProfileSuccess(res));
    } catch (err) {
      yield put(updateUserProfileFail(err));
    }
  }
};

const updateUserAvatarSaga = {
  on: updateUserAvatar,
  *worker(action: Action<string>) {
    try {
      const currentProfile = yield select(currentProfileSelector);
      const img = yield call(cloudiaryService.uploadImage, action.payload);
      const res = yield call(userService.update, {...currentProfile, avatar: img.url});
      yield put(updateUserAvatarSuccess(res));
    } catch (err) {
      yield put(updateUserAvatarFail(err));
    }
  }
};

export default createSagas([getUserProfileSaga, updateUserProfileSaga, updateUserAvatarSaga]);
