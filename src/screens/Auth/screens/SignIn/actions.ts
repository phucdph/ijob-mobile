import { createAsyncAction } from 'utils/redux';

const { signIn, signInSuccess, signInFail } = createAsyncAction(
  'signIn',
  'SIGN_IN'
);

export { signIn, signInSuccess, signInFail };
