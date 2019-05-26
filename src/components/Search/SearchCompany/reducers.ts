import {
  searchNextCompanySuccess,
  searchNextCompanyFail,
  searchNextCompany,
  searchCompany,
  searchCompanyFail,
  searchCompanySuccess,
  refreshSearchCompany,
  resetSearchCompany
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, ISearchCompanyState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { Action } from 'services/typings';
import { IPageableData } from 'services/models';
import { get } from 'lodash';
import { ISearchCompany } from '../../../screens/Search/screens/SearchResult/services/typings';

const searchCompanyReducers = [
  {
    on: [searchCompany, searchNextCompany, refreshSearchCompany],
    reducer: (state: ISearchCompanyState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: searchCompanySuccess,
    reducer: (state: ISearchCompanyState, action: Action<IPageableData<ISearchCompany>>) => {
      state.action = action.type;
      state.data = action.payload;
    }
  },
  {
    on: resetSearchCompany,
    reducer: (state: ISearchCompanyState) => {
      // tslint:disable-next-line:forin
      for (const key in state) {
        // @ts-ignore
        state[key] = initialState[key];
      }
    }
  },
  {
    on: [searchCompanyFail, searchNextCompanyFail],
    reducer: (state: ISearchCompanyState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: searchNextCompanySuccess,
    reducer: (state: ISearchCompanyState, action: Action<IPageableData<ISearchCompany>>) => {
      const { data, total } = action.payload;
      state.action = action.type;
      state.data = {
        total,
        data: get(state, 'data.data', []).concat(data)
      };
    }
  }
];

export default createReducers(stateContext, searchCompanyReducers, initialState);
