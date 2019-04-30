import { createSagas } from 'utils/redux';
import {
  getUserProfile, getUserProfileSuccess, getUserProfileFail
} from './actions';
import { call, put } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { userService } from './services/userService';

const getUserProfileSaga = {
  on: getUserProfile,
  *worker(action: Action<string>) {
    try {
      const res = yield call(userService.getUserProfile, action.payload);
      yield put(getUserProfileSuccess(res.data));
    } catch (err) {
      yield put(getUserProfileFail(err));
    }
  }
};


export default createSagas([getUserProfileSaga]);
