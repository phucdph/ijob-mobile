import { createAction, createAsyncAction } from 'utils/redux';

export const { getJobDetail, getJobDetailSuccess, getJobDetailFail } = createAsyncAction(
  'getJobDetail',
  'GET_JOB_DETAIL'
);

export const refreshJobDetail = createAction('REFRESH_JOB_DETAIL');

