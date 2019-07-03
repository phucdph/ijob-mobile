import { createSagas } from 'utils/redux';
import { signOut } from './actions';
import { call, put } from 'redux-saga/effects';
import { authService } from 'screens/Auth/services/authService';
import navigationService from 'services/navigationService';
import { resetAppState } from '../../actions';

const signOutSaga = {
  on: signOut,
  *worker() {
    try {
      yield call(authService.clearPresistAuth);
      yield put(resetAppState());
      authService.signOut();
    } catch (err) {
      console.log(err);
    } finally {
      navigationService.navigate({ routeName: 'SignIn'});
    }
  }
};



export default [
  ...require('./screens/SignIn/sagas').default,
  ...require('./screens/SignUp/sagas').default,
  ...createSagas([signOutSaga]),
];
