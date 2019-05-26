import { createSagas } from 'utils/redux';
import {
  searchCompany,
  searchCompanySuccess,
  searchCompanyFail,
  searchNextCompany,
  searchNextCompanyFail,
  searchNextCompanySuccess,
  refreshSearchCompany
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { searchService } from '../../../screens/Search/screens/SearchResult/services/searchService';
import { ISearchCompanyRequest } from 'components/Search/SearchCompany/services/typings';

const searchCompanySaga = {
  on: [searchCompany, refreshSearchCompany],
  *worker(action: Action<ISearchCompanyRequest>) {
    try {
      const res = yield call(searchService.searchCompany, action.payload);
      yield delay(1000);
      yield put(searchCompanySuccess(res));
    } catch (err) {
      yield put(searchCompanyFail(err));
    }
  }
};

const searchCompanySkillSaga = {
  on: searchNextCompany,
  *worker(action: Action<ISearchCompanyRequest>) {
    try {
      const res = yield call(searchService.searchCompany, action.payload);
      yield delay(1000);
      yield put(searchNextCompanySuccess(res));
    } catch (err) {
      yield put(searchNextCompanyFail(err));
    }
  }
};

export default createSagas([searchCompanySaga, searchCompanySkillSaga]);
