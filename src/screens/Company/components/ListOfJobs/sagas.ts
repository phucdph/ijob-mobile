import {
  getCompanyJob, getCompanyJobFail, getCompanyJobSuccess
} from './actions';
import { Action } from 'services/typings';
import { call, put } from 'redux-saga/effects';
import { createSagas } from 'utils/redux';
import { companyService } from '../../services/companyService';

const getCompanyJobSaga = {
  on: getCompanyJob,
  *worker(action: Action<{companyId: string}>) {
    try {
      const { companyId } = action.payload;
      const res = yield call(companyService.getJob, action.payload);
      yield put(getCompanyJobSuccess({ id: companyId, data: res.data}));
    } catch (error) {
      const { companyId } = action.payload;
      yield put(getCompanyJobFail({ id: companyId, error }));
    }
  }
};


export default createSagas([getCompanyJobSaga]);
