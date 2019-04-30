import { createAsyncAction, createAction } from 'utils/redux';

export const { getFeed, getFeedSuccess, getFeedFail } = createAsyncAction(
  'getFeed',
  'GET_FEED'
);

export const { getNextFeed, getNextFeedSuccess, getNextFeedFail } = createAsyncAction(
  'getNextFeed',
  'GET_NEXT_FEED'
);

export const refreshFeed = createAction('REFRESH_FEED');

