import {
  getUserProfile, getUserProfileSuccess, getUserProfileFail, refreshUserProfile
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, IUserState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { IUser } from './services/typings';
import { Action } from 'services/typings';

const userReducers = [
  {
    on: getUserProfile,
    reducer: (state: IUserState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: refreshUserProfile,
    reducer: (state: IUserState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getUserProfileSuccess,
    reducer: (state: IUserState, action: Action<IUser>) => {
      state.action = action.type;
      state.data = action.payload;
    }
  },
  {
    on: getUserProfileFail,
    reducer: (state: IUserState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
];

export default createReducers(stateContext, userReducers, initialState);
