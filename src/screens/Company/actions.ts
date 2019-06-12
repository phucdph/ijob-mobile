import { createAction, createAsyncAction } from 'utils/redux';

export const { getCompany, getCompanySuccess, getCompanyFail } = createAsyncAction(
  'getCompany',
  'GET_COMPANY'
);

export const { followCompany, followCompanySuccess, followCompanyFail } = createAsyncAction(
  'followCompany',
  'FOLLOW_COMPANY'
);

export const { unFollowCompany, unFollowCompanySuccess, unFollowCompanyFail } = createAsyncAction(
  'unFollowCompany',
  'UNFOLLOW_COMPANY'
);

export const refreshCompany = createAction('REFRESH_COMPANY');
