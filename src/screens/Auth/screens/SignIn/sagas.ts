import { createSagas } from 'utils/redux';
import { signIn, signInFail, signInSuccess } from './actions';
import { call, delay, put, all } from 'redux-saga/effects';
import { authService } from 'screens/Auth/services/authService';
import { Action } from 'services/typings';
import navigationService from 'services/navigationService';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { SignInStatus } from './constants';
import { getUserProfileSuccess } from '../../../Profile/actions';
import { registerForPushNotificationsAsync } from 'utils/notification';
import { get } from 'lodash';

const signInSaga = {
  on: signIn,
  *worker(action: Action<ISignUpRequest>) {
    try {
      const res = yield call(authService.signIn, action.payload);
      yield all([
        put(signInSuccess()),
        call(authService.presistAuth, res.data),
        put(getUserProfileSuccess(res.data.profile)),
      ]);
      // yield registerForPushNotificationsAsync(get(res, 'data.profile.id'));
      // navigationService.dispatch(
      //   NavigationActions.navigate({
      //     routeName: 'App'
      //   })
      // );
    } catch (err) {
      console.log(err);
      let msg = 'Something wrong. Please try again later';
      switch (err.status || err.error) {
        case SignInStatus.USER_NOT_FOUND: {
          msg = "Your email and password doesn't match";
          break;
        }
        case SignInStatus.INCORRECT_PASSWORD: {
          msg = "Your email and password doesn't match";
          break;
        }
        default: {
          break;
        }
      }
      Alert.alert('Error', msg);
      yield put(signInFail(err));
    }
  }
};

export default createSagas([signInSaga]);
