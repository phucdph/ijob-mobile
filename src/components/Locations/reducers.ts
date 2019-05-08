import {
  getLocations, getLocationsSuccess, getLocationsFail, refreshLocations
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, ILocationState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { ILocation } from './services/typings';
import { Action } from 'services/typings';

const locationReducers = [
  {
    on: getLocations,
    reducer: (state: ILocationState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: refreshLocations,
    reducer: (state: ILocationState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getLocationsSuccess,
    reducer: (state: ILocationState, action: Action<ILocation[]>) => {
      state.action = action.type;
      state.data = action.payload;
    }
  },
  {
    on: getLocationsFail,
    reducer: (state: ILocationState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
];

export default createReducers(stateContext, locationReducers, initialState);
