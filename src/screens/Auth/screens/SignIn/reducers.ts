import { signIn, signInSuccess, signInFail } from './actions';
import { createReducers } from 'utils/redux';
import initialState, { stateContext, SignInState } from './state';
import { Action } from 'redux-actions';
import { ErrorState, IError } from 'services/models/Error';

const signInReducers = [
  {
    on: signIn,
    reducer: (state: SignInState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: signInSuccess,
    reducer: (state: SignInState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: signInFail,
    reducer: (state: SignInState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  }
];

export default createReducers(stateContext, signInReducers, initialState);
