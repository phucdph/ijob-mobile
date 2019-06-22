import { createAsyncAction, createAction } from 'utils/redux';

export const { getNotification, getNotificationSuccess, getNotificationFail } = createAsyncAction(
  'getNotification',
  'GET_NOTIFICATION'
);

export const { getNextNotification, getNextNotificationSuccess, getNextNotificationFail } = createAsyncAction(
  'getNextNotification',
  'GET_NEXT_NOTIFICATION'
);

export const refreshNotification = createAction('REFRESH_NOTIFICATION');

