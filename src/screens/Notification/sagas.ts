import {
  getNotification,
  getNotificationSuccess,
  getNotificationFail,
  refreshNotification,
  getNextNotification,
  getNextNotificationFail,
  getNextNotificationSuccess
} from './actions';
import { Action } from 'services/typings';
import { createSagas } from 'utils/redux';
import { call, put } from 'redux-saga/effects';
import { notificationService } from './services/notificationService';
import { INotificationRequest } from './services/typings';

const getNotificationSaga = {
  on: [getNotification, refreshNotification],
  *worker(action: Action<INotificationRequest>) {
    try {
      const res = yield call(
        notificationService.getNotification,
        action.payload
      );
      yield put(getNotificationSuccess(res));
    } catch (err) {
      yield put(getNotificationFail(err));
    }
  }
};

const getNextNotificationSaga = {
  on: getNextNotification,
  *worker(action: Action<INotificationRequest>) {
    try {
      const res = yield call(
        notificationService.getNotification,
        action.payload
      );
      yield put(getNotificationSuccess(res));
    } catch (err) {
      yield put(getNextNotificationFail(err));
    }
  }
};

export default createSagas([getNotificationSaga, getNextNotificationSaga]);
