import {
  search,
  searchSuccess,
  searchFail,
  refreshSearch,
  searchNext,
  searchNextFail,
  searchNextSuccess,
} from './actions';
import { Action } from 'services/typings';
import { searchService } from '../../services/typings/searchService';
import {
  put,
  call,
  all,
  delay
} from 'redux-saga/effects';
import { createSagas } from 'utils/redux';
import { ISearchRequest, SearchType } from './services/typings';

const searchSagas = [
  {
    on: [refreshSearch, search],
    *worker(action: Action<ISearchRequest>) {
      try {
        const { searchType } = action.payload;
        switch (searchType) {
          case SearchType.ALL: {
            const [companies, jobs] = yield all([
              call(searchService.searchCompany, action.payload),
              call(searchService.searchJob, action.payload)
            ]);
            yield put(searchSuccess({ companies, jobs }));
            break;
          }
          case SearchType.COMPANY: {
            const companies = yield call(
              searchService.searchCompany,
              action.payload
            );
            yield put(searchSuccess({ companies }));
            break;
          }
          case SearchType.JOB: {
            const jobs = yield call(searchService.searchJob, action.payload);
            yield put(searchSuccess({ jobs }));
            break;
          }
          default: {
            yield put(searchSuccess({ jobs: null, companies: null }));
            break;
          }
        }
      } catch (err) {
        yield put(searchFail(err));
      }
    }
  },
  {
    on: searchNext,
    *worker(action: Action<ISearchRequest>) {
      try {
        const { searchType } = action.payload;
        switch (searchType) {
          case SearchType.COMPANY: {
            const companies = yield call(
              searchService.searchCompany,
              action.payload
            );
            yield put(searchNextSuccess({ companies }));
            break;
          }
          case SearchType.JOB: {
            const jobs = yield call(searchService.searchJob, action.payload);
            yield put(searchNextSuccess({ jobs }));
            break;
          }
          default: {
            yield put(searchNextSuccess({ jobs: null, companies: null }));
          }
        }
      } catch (err) {
        yield put(searchNextFail(err));
      }
    }
  }
];


export default [...createSagas(searchSagas)];
