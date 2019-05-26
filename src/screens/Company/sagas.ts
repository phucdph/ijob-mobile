import { getCompany, getCompanyFail,getCompanySuccess, refreshCompany } from './actions';
import { Action } from 'services/typings';
import { call, put, delay } from 'redux-saga/effects'
import { companyService } from './services/companyService';
import { createSagas } from 'utils/redux';

const getCompanySaga = {
  on: [getCompany, refreshCompany],
  *worker(action: Action<string>) {
    try {
      const res = yield call(companyService.getCompany, action.payload);
      yield delay(2000);
      yield put(getCompanySuccess(res.data));
    } catch (error) {
      yield put(getCompanyFail({ id: action.payload, error }));
    }
  }
};

export default createSagas([getCompanySaga]);
