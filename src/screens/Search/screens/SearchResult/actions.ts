import { createAsyncAction, createAction } from 'utils/redux';

export const { search, searchSuccess, searchFail } = createAsyncAction(
  'search',
  'SEARCH'
);

export const { searchNext, searchNextSuccess, searchNextFail } = createAsyncAction(
  'searchNext',
  'SEARCH_NEXT'
);

export const refreshSearch = createAction('REFRESH_SEARCH');

export const cleanUpSearch = createAction('CLEAN_UP_SEARCH');


