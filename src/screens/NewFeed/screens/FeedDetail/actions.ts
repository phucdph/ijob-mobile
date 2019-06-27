import { createAction, createAsyncAction } from 'utils/redux';

export const { getJobDetail, getJobDetailSuccess, getJobDetailFail } = createAsyncAction(
  'getJobDetail',
  'GET_JOB_DETAIL'
);

export const { applyJob, applyJobSuccess, applyJobFail } = createAsyncAction(
  'applyJob',
  'APPLY_JOB'
);

export const refreshJobDetail = createAction('REFRESH_JOB_DETAIL');

