import {
  getCompany,
  getCompanyFail,
  getCompanySuccess,
  refreshCompany,
  followCompany,
  followCompanySuccess,
  followCompanyFail,
  unFollowCompany,
  unFollowCompanySuccess,
  unFollowCompanyFail
} from './actions';
import { Action } from 'services/typings';
import { call, put, delay } from 'redux-saga/effects';
import { companyService } from './services/companyService';
import { createSagas } from 'utils/redux';

const getCompanySaga = {
  on: [getCompany, refreshCompany],
  *worker(action: Action<string>) {
    try {
      const res = yield call(companyService.getCompany, action.payload);
      yield put(getCompanySuccess(res.data));
    } catch (error) {
      yield put(getCompanyFail({ id: action.payload, error }));
    }
  }
};

const followCompanySaga = {
  on: followCompany,
  *worker(action: Action<string>) {
    try {
      yield call(companyService.follow, action.payload);
      yield put(followCompanySuccess(action.payload));
    } catch (error) {
      yield put(followCompanyFail({ id: action.payload, error }));
    }
  }
};

const unFollowCompanySaga = {
  on: unFollowCompany,
  *worker(action: Action<string>) {
    try {
      yield call(companyService.unfollow, action.payload);
      yield put(unFollowCompanySuccess(action.payload));
    } catch (error) {
      yield put(unFollowCompanyFail({ id: action.payload, error }));
    }
  }
};

export default [
  ...createSagas([getCompanySaga, followCompanySaga, unFollowCompanySaga]),
  ...require('./components/ListOfJobs/sagas').default,
];
