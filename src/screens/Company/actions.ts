import { createAction, createAsyncAction } from 'utils/redux';

export const { getCompany, getCompanySuccess, getCompanyFail } = createAsyncAction(
  'getCompany',
  'GET_COMPANY'
);

export const refreshCompany = createAction('REFRESH_COMPANY');
