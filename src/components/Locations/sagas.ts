import { createSagas } from 'utils/redux';
import {
  getLocations, getLocationsSuccess, getLocationsFail, refreshLocations
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { locationService } from './services/locationService';

const locationsSaga = {
  on: [getLocations, refreshLocations],
  *worker() {
    try {
      const res = yield call(locationService.getLocations);
      yield delay(1000);
      yield put(getLocationsSuccess(res));
    } catch (err) {
      yield put(getLocationsFail(err));
    }
  }
};


export default createSagas([locationsSaga]);
