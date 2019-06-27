import { getJobDetail, getJobDetailSuccess, getJobDetailFail, refreshJobDetail, applyJob, applyJobFail, applyJobSuccess } from './actions';
import { Action } from 'services/typings';
import { jobService } from '../../services/jobService';
import { call, put } from 'redux-saga/effects';
import { createSagas } from 'utils/redux';

const jobDetailSaga = {
  on: [getJobDetail, refreshJobDetail],
  *worker(action: Action<{id: string}>) {
    try {
      const { id } = action.payload;
      const res = yield call(jobService.getJob, id);
      yield put(getJobDetailSuccess(res.data));
    } catch (err) {
      const { id } = action.payload;
      yield put(getJobDetailFail({id, err}));
    }
  }
};

const applyJobSaga = {
  on: applyJob,
  *worker(action: Action<{ id: string }>) {
    try {
      const { id } = action.payload
      yield call(jobService.apply, id);
      yield put(applyJobSuccess(action.payload));
    } catch (err) {
      const { id } = action.payload;
      yield put(applyJobFail({id, err}));
    }
  }
};

export default createSagas([jobDetailSaga, applyJobSaga]);
