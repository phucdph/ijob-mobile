import { createAction, createAsyncAction } from 'utils/redux';

export const { searchCompany, searchCompanySuccess, searchCompanyFail } = createAsyncAction(
  'searchCompany',
  'SEARCH_COMPANY'
);

export const { searchNextCompany, searchNextCompanySuccess, searchNextCompanyFail } = createAsyncAction(
  'searchNextCompany',
  'SEARCH_NEXT_COMPANY'
);

export const refreshSearchCompany = createAction('REFRESH_SEARCH_COMPANY');

export const resetSearchCompany = createAction('RESET_SEARCH_COMPANY');

