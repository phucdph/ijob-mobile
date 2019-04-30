import { createSagas } from 'utils/redux';
import {
  getFeed,
  getFeedSuccess,
  getFeedFail,
  getNextFeed,
  getNextFeedSuccess,
  getNextFeedFail,
  refreshFeed
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { Action } from 'services/typings';
import { newfeedService } from './services/newfeedService';
import { IFeedRequest } from './services/typings';

const getFeedSaga = {
  on: getFeed,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(newfeedService.getFeeds, action.payload);
      yield put(getFeedSuccess(res.data));
    } catch (err) {
      yield put(getFeedFail(err));
    }
  }
};

const getNextFeedSaga = {
  on: getNextFeed,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(newfeedService.getFeeds, action.payload);
      yield put(getNextFeedSuccess(res.data));
    } catch (err) {
      yield put(getNextFeedFail(err));
    }
  }
};

const refreshFeedSaga = {
  on: refreshFeed,
  *worker(action: Action<IFeedRequest>) {
    try {
      const res = yield call(newfeedService.getFeeds, action.payload);
      yield delay(1000);
      yield put(getFeedSuccess(res.data));
    } catch (err) {
      yield put(getFeedFail(err));
    }
  }
};

export default createSagas([getFeedSaga, getNextFeedSaga, refreshFeedSaga]);
