import { createSagas } from 'utils/redux';
import {
  getNextJobsSuccess,
  getNextJobsFail,
  getNextJobs,
  getJobsSuccess,
  getJobsFail,
  getJobs,
  saveJobSuccess,
  saveJobFail,
  saveJob, unsaveJob, unsaveJobSuccess, unsaveJobFail, refreshJobs
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { jobService } from './services/jobService';
import { IFeedRequest } from './services/typings';

const saveJobSaga = {
  on: saveJob,
  *worker(action: Action<string>) {
    try {
      yield call(jobService.saveJob, action.payload);
      yield put(saveJobSuccess(action.payload));
    } catch (err) {
      yield put(saveJobFail(err));
    }
  }
};

const unsaveJobSaga = {
  on: unsaveJob,
  *worker(action: Action<string>) {
    try {
      yield call(jobService.unsaveJob, action.payload);
      yield put(unsaveJobSuccess(action.payload));
    } catch (err) {
      yield put(unsaveJobFail(err));
    }
  }
};

const getFeedSaga = {
  on: getJobs,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(jobService.getFeeds, action.payload);
      yield put(getJobsSuccess(res.data));
    } catch (err) {
      yield put(getJobsFail(err));
    }
  }
};

const getNextFeedSaga = {
  on: getNextJobs,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(jobService.getFeeds, action.payload);
      yield delay(1000);
      yield put(getNextJobsSuccess(res.data));
    } catch (err) {
      yield put(getNextJobsFail(err));
    }
  }
};

const refreshFeedSaga = {
  on: refreshJobs,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(jobService.getFeeds, action.payload);
      yield delay(1000);
      yield put(getJobsSuccess(res.data));
    } catch (err) {
      yield put(getJobsFail(err));
    }
  }
};

export default [
  ...createSagas([getFeedSaga, getNextFeedSaga, refreshFeedSaga, saveJobSaga, unsaveJobSaga]),
  ...require('./screens/FeedDetail/sagas').default,
];
