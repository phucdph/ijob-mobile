import {
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFail,
  refreshUserProfile,
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFail,
  updateUserAvatar,
  updateUserAvatarSuccess,
  updateUserAvatarFail
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, IUserState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { IUser } from './services/typings';
import { Action } from 'services/typings';
import { IJob } from '../NewFeed/services/typings';
import { ICompany } from '../Company/services/typings';

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
      const { saveJob = [] as any, followCompany = [] as any } = action.payload;
      state.action = action.type;
      state.data = {
        ...action.payload,
        followCompany: followCompany.map((c: any) => c.id),
        saveJob: saveJob.map((job: IJob) => job.id),
      };
    }
  },
  {
    on: getUserProfileFail,
    reducer: (state: IUserState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: [updateUserProfile, updateUserAvatar],
    reducer: (state: IUserState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: [updateUserProfileSuccess, updateUserAvatarSuccess],
    reducer: (state: IUserState, action: Action<IUser>) => {
      state.action = action.type;
      state.data = { ...state.data, ...action.payload };
    }
  },
  {
    on: [updateUserProfileFail, updateUserAvatarFail],
    reducer: (state: IUserState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  }
];

export default createReducers(stateContext, userReducers, initialState);
