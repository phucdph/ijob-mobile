import { createReducers } from 'utils/redux';
import { initialState, IState, stateContext } from './state';
import { Action } from 'services/typings';
import { ISearchCompany, ISearchJob, ISearchRequest } from './services/typings';
import {
  search,
  searchSuccess,
  searchFail,
  searchNextSuccess,
  searchNextFail,
  searchNext,
  cleanUpSearch,
  refreshSearch
} from './actions';
import { get } from 'lodash';
import { IPageableData } from 'services/models';
import { IError } from 'services/models/Error';
const searchReducers = [
  {
    on: [refreshSearch, searchNext, search],
    reducer(state: IState, action: Action<ISearchRequest>) {
      state.req = action.payload;
      state.action = action.type;
    }
  },
  {
    on: searchSuccess,
    reducer(
      state: IState,
      action: Action<{
        companies: IPageableData<ISearchCompany>;
        jobs: IPageableData<ISearchJob>;
      }>
    ) {
      const { companies, jobs } = action.payload;
      state.action = action.type;
      if (companies) {
        state.companies = {
          data: get(companies, 'data', []),
          total: get(companies, 'total', 0)
        };
      }
      if (jobs) {
        state.jobs = {
          data: get(jobs, 'data', []),
          total: get(jobs, 'total', 0)
        };
      }
    }
  },
  {
    on: searchNextSuccess,
    reducer(
      state: IState,
      action: Action<{
        companies: IPageableData<ISearchCompany>;
        jobs: IPageableData<ISearchJob>;
      }>
    ) {
      const { companies, jobs } = action.payload;
      state.action = action.type;
      if (companies) {
        state.companies.data = state.companies.data.concat(
          get(companies, 'data', [])
        );
      }
      if (jobs) {
        state.jobs.data = state.jobs.data.concat(get(jobs, 'data', []));
      }
    }
  },
  {
    on: [searchFail, searchNextFail],
    reducer(state: IState, action: Action<IError>) {
      state.action = action.type;
      state.error = action.payload;
    }
  },
  {
    on: cleanUpSearch,
    reducer(state: IState) {
      // tslint:disable-next-line:forin
      for (const key in state) {
        // @ts-ignore
        state[key] = initialState[key];
      }
    }
  }
];

export default createReducers(stateContext, searchReducers, initialState);
