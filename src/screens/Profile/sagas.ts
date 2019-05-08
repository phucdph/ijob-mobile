import { createSagas } from 'utils/redux';
import {
  getUserProfile, getUserProfileSuccess, getUserProfileFail, refreshUserProfile
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { userService } from './services/userService';

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


export default createSagas([getUserProfileSaga]);
