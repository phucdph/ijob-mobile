import { createSagas } from 'utils/redux';
import {
  searchSkills,
  searchSkillsSuccess,
  searchSkillsFail,
  refreshSearchSkills,
  searchNextSkills,
  searchNextSkillsSuccess,
  searchNextSkillsFail
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { ISearchSKillRequest } from 'components/Search/SearchSkill/services/typings';
import { Action } from 'services/typings';
import { searchService } from '../../../screens/Search/screens/SearchResult/services/searchService';

const searchSkillSaga = {
  on: [searchSkills, refreshSearchSkills],
  *worker(action: Action<ISearchSKillRequest>) {
    try {
      const res = yield call(searchService.searchSkill, action.payload);
      yield delay(1000);
      yield put(searchSkillsSuccess(res));
    } catch (err) {
      yield put(searchSkillsFail(err));
    }
  }
};

const searchNextSkillSaga = {
  on: searchNextSkills,
  *worker(action: Action<ISearchSKillRequest>) {
    try {
      const res = yield call(searchService.searchSkill, action.payload);
      yield delay(1000);
      yield put(searchNextSkillsSuccess(res));
    } catch (err) {
      yield put(searchNextSkillsFail(err));
    }
  }
};

export default createSagas([searchSkillSaga, searchNextSkillSaga]);
