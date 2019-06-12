import { createAsyncAction } from 'utils/redux';

export const { getCompanyJob, getCompanyJobSuccess, getCompanyJobFail } = createAsyncAction(
  'getCompanyJob',
  'GET_COMPANY_JOB'
);
