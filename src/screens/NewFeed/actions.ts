import { createAsyncAction, createAction } from 'utils/redux';

export const { getJobs, getJobsSuccess, getJobsFail } = createAsyncAction(
  'getJobs',
  'GET_JOBS'
);

export const { getNextJobs, getNextJobsSuccess, getNextJobsFail } = createAsyncAction(
  'getNextJobs',
  'GET_NEXT_JOBS'
);

export const { saveJob, saveJobSuccess, saveJobFail } = createAsyncAction(
  'saveJob',
  'SAVE_JOB'
);

export const { unsaveJob, unsaveJobSuccess, unsaveJobFail } = createAsyncAction(
  'unsaveJob',
  'UNSAVE_JOB'
);

export const refreshJobs = createAction('REFRESH_JOBS');

