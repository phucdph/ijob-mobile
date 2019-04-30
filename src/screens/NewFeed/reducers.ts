import {
  getFeed,
  getFeedSuccess,
  getFeedFail,
  getNextFeed,
  getNextFeedSuccess,
  getNextFeedFail, refreshFeed
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, IFeedState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { IPageableData } from 'services/models';
import { IFeed } from './services/typings';
import { Action } from 'services/typings';
import { get } from 'lodash';

const feedReducers = [
  {
    on: getFeed,
    reducer: (state: IFeedState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getFeedSuccess,
    reducer: (state: IFeedState, action: Action<IPageableData<IFeed>>) => {
      const { data = [], total = 0 } = action.payload;
      state.action = action.type;
      state.data = {
        data,
        total
      };
    }
  },
  {
    on: getFeedFail,
    reducer: (state: IFeedState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: getNextFeed,
    reducer: (state: IFeedState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getNextFeedSuccess,
    reducer: (state: IFeedState, action: Action<IPageableData<IFeed>>) => {
      const { data = [], total = 0 } = action.payload;
      state.action = action.type;
      state.data = {
        data: get(state, 'data.data', []).concat(data),
        total
      };
    }
  },
  {
    on: getNextFeedFail,
    reducer: (state: IFeedState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: refreshFeed,
    reducer: (state: IFeedState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
];

export default createReducers(stateContext, feedReducers, initialState);
