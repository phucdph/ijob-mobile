import { createAsyncAction, createAction } from 'utils/redux';

export const { signUp, signUpSuccess, signUpFail } = createAsyncAction(
  'signUp',
  'SIGN_UP'
);

export const tokenAuth = createAction('TOKEN_AUTH');
