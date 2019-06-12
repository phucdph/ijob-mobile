import { createReducers } from 'utils/redux';
import { stateContext, initialState, ISearchHistoryState} from './state';
import { getSearchHistory, getSearchHistorySuccess, getSearchHistoryFail, createSearchHistory, createSearchHistoryFail, createSearchHistorySuccess } from './actions';
import { Action } from 'services/typings';
import { ISearchHistory } from '../../services/typings';
import { IError } from 'services/models/Error';

const searchHistoryReducers = [
  {
    on: [getSearchHistory, createSearchHistory],
    reducer(state: ISearchHistoryState, action: Action<{}>) {
      state.action = action.type;
    }
  },
  {
    on: getSearchHistorySuccess,
    reducer(state: ISearchHistoryState, action: Action<ISearchHistory[]>) {
      state.action = action.type;
    }
  },
  {
    on: [getSearchHistoryFail,createSearchHistoryFail],
    reducer(state: ISearchHistoryState, action: Action<IError>) {
      state.action = action.type;
      state.error = action.payload;
    }
  },
  {
    on: createSearchHistorySuccess,
    reducer(state: ISearchHistoryState, action: Action<ISearchHistory>) {
      state.action = action.type;
      state.data.push(action.payload);
      if (state.data.length > 10) {
        state.data.pop();
      }
    }
  },

];

export default createReducers(stateContext, searchHistoryReducers, initialState);
