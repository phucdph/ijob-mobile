import { createSagas } from 'utils/redux';
import { signUp, signUpSuccess, signUpFail } from './actions';
import { put, call } from 'redux-saga/effects';
import { authService } from 'screens/Auth/services/authService';
import { Action } from 'services/typings';
import navigationService from 'services/navigationService';
import { NavigationActions } from 'react-navigation';
import { getUserProfileSuccess } from '../../../Profile/actions';
import { registerForPushNotificationsAsync } from 'utils/notification.tsx';
import { userService } from '../../../Profile/services/userService';
import { SignInStatus } from '../SignIn/constants';
import { Alert } from 'react-native';

const signUpSaga = {
  on: signUp,
  *worker(action: Action<ISignUpRequest>) {
    try {
      const res = yield call(authService.signUp, action.payload);
      yield put(signUpSuccess());
      yield call(authService.presistAuth, res.data);
      yield put(getUserProfileSuccess(res.data.profile));
      const token = yield call(registerForPushNotificationsAsync);
      if (token) {
        yield call(userService.savePushToken, token);
      }
      navigationService.dispatch(
        NavigationActions.navigate({
          routeName: 'TourGuideModal'
        })
      );
    } catch (err) {
      let msg = 'Something wrong. Please try again later';
      switch (err.status || err.error) {
        case 'EMAIL_ALREADY_EXISTS': {
          msg = "This email was already exist. Please try another one";
          break;
        }
        default: {
          break;
        }
      }
      Alert.alert('Error', msg);
      yield put(signUpFail(err));
    }
  }
};

export default createSagas([signUpSaga]);
