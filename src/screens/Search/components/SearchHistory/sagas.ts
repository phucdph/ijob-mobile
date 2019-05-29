import { getSearchHistory, getSearchHistoryFail, getSearchHistorySuccess, createSearchHistory, createSearchHistorySuccess, createSearchHistoryFail } from './actions';
import { put, call } from 'redux-saga/effects';
import { createSagas } from 'utils/redux';
import { searchService } from '../../services/typings/searchService';
import { ISearchHistory } from '../../services/typings';
import { Action } from 'services/typings';

const getSearchHistorySaga = {
  on: getSearchHistory,
  *worker() {
    try {
      const res = yield call(searchService.getHistory);
      yield put(getSearchHistorySuccess(res));
    } catch (err) {
      yield put(getSearchHistoryFail(err));
    }
  }
};

const createSearchHistorySaga = {
  on: createSearchHistory,
  *worker(action: Action<ISearchHistory>) {
    try {
      const res = yield call(searchService.createHistory, action.payload);
      yield put(createSearchHistorySuccess(res));
    } catch (err) {
      yield put(getSearchHistoryFail(err));
    }
  }
};

export default createSagas([getSearchHistorySaga, createSearchHistorySaga]);
