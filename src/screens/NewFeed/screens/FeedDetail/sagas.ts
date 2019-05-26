import { getJobDetail, getJobDetailSuccess, getJobDetailFail, refreshJobDetail } from './actions';
import { Action } from 'services/typings';
import { jobService } from '../../services/jobService';
import { call, put } from 'redux-saga/effects';
import { createSagas } from 'utils/redux';

const jobDetailSaga = {
  on: [getJobDetail, refreshJobDetail],
  *worker(action: Action<string>) {
    try {
      const res = yield call(jobService.getJob, action.payload);
      yield put(getJobDetailSuccess(res.data));
    } catch (err) {
      yield put(getJobDetailFail(err));
    }
  }
};

export default createSagas([jobDetailSaga]);
