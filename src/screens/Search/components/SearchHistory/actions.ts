import { createAsyncAction } from 'utils/redux';

export const { getSearchHistory, getSearchHistorySuccess, getSearchHistoryFail } = createAsyncAction(
  'getSearchHistory',
  'GET_SEARCH_HISTOTY'
);

export const { createSearchHistory, createSearchHistorySuccess, createSearchHistoryFail } = createAsyncAction(
  'createSearchHistory',
  'CREATE_SEARCH_HISTOTY'
);
