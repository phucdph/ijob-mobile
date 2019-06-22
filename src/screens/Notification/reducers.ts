import { createReducers } from 'utils/redux';
import { stateContext, initialState, INotificationState } from './state';
import { Action } from 'services/typings';
import {
  getNotification,
  getNotificationSuccess,
  getNotificationFail,
  refreshNotification,
  getNextNotificationFail,
  getNextNotification,
  getNextNotificationSuccess
} from './actions';
import { IPageableData } from 'services/models';
import { INotification } from './services/typings';

const reducers = [
  {
    on: [getNotification, getNextNotification, refreshNotification],
    reducer: (state: INotificationState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getNotificationSuccess,
    reducer: (
      state: INotificationState,
      action: Action<IPageableData<INotification>>
    ) => {
      state.action = action.type;
      state.data = action.payload;
    }
  },
  {
    on: getNextNotificationSuccess,
    reducer: (
      state: INotificationState,
      action: Action<IPageableData<INotification>>
    ) => {
      const { data } = action.payload;
      state.action = action.type;
      state.data.data.concat(data);
    }
  },
  {
    on: [getNotificationFail, getNextNotificationFail],
    reducer: (state: INotificationState, action: Action<{}>) => {
      state.action = action.type;
    }
  }
];

export default createReducers(stateContext, reducers, initialState);
