import { signUp, signUpSuccess, signUpFail } from './actions';
import { createReducers } from 'utils/redux';
import initialState, { stateContext, SignUpState } from './state';
import { Action } from 'redux-actions';

const signUpReducers = [
  {
    on: signUp,
    reducer: (state: SignUpState, action: Action<any>) => {
      state.action = action.type;
    }
  },
  {
    on: signUpSuccess,
    reducer: (state: SignUpState, action: Action<any>) => {
      state.action = action.type;
    }
  },
  {
    on: signUpFail,
    reducer: (state: SignUpState, action: Action<any>) => {
      state.action = action.type;
    }
  }
];

export default createReducers(stateContext, signUpReducers, initialState);
