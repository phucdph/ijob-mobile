import { createSagas } from 'utils/redux';
import { signUp, signUpSuccess, signUpFail } from './actions';
import { put, call, delay } from 'redux-saga/effects';
import { authService } from 'screens/Auth/services/authService';
import { Action } from 'services/typings';
import navigationService from 'services/navigationService';
import { NavigationActions } from 'react-navigation';
import { getUserProfileSuccess } from '../../../Profile/actions';
import { registerForPushNotificationsAsync } from 'utils/notification';

const signUpSaga = {
  on: signUp,
  *worker(action: Action<ISignUpRequest>) {
    try {
      const res = yield call(authService.signUp, action.payload);
      yield put(signUpSuccess());
      yield call(authService.presistAuth, res.data);
      yield put(getUserProfileSuccess(res.data.profile));
      registerForPushNotificationsAsync();
      navigationService.dispatch(
        NavigationActions.navigate({
          routeName: 'App'
        })
      );
    } catch (err) {
      yield put(signUpFail(err));
    }
  }
};

export default createSagas([signUpSaga]);
