import {
  searchSkills,
  searchSkillsSuccess,
  searchSkillsFail,
  searchNextSkills,
  searchNextSkillsSuccess,
  searchNextSkillsFail,
  refreshSearchSkills, resetSearchSkills
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, ILocationState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { ISkill } from './services/typings';
import { Action } from 'services/typings';
import { IPageableData } from 'services/models';
import {get} from 'lodash';

const skillReducers = [
  {
    on: [searchSkills, searchNextSkills, refreshSearchSkills],
    reducer: (state: ILocationState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: searchSkillsSuccess,
    reducer: (state: ILocationState, action: Action<IPageableData<ISkill>>) => {
      state.action = action.type;
      state.data = action.payload;
    }
  },
  {
    on: resetSearchSkills,
    reducer: (state: ILocationState) => {
      // tslint:disable-next-line:forin
      for (const key in state) {
        // @ts-ignore
        state[key] = initialState[key];
      };
    }
  },
  {
    on: [searchSkillsFail, searchNextSkillsFail],
    reducer: (state: ILocationState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: searchNextSkillsSuccess,
    reducer: (state: ILocationState, action: Action<IPageableData<ISkill>>) => {
      const { data, total } = action.payload;
      state.action = action.type;
      state.data = {
        total,
        data: get(state,'data.data', []).concat(data),
      };
    }
  },
];

export default createReducers(stateContext, skillReducers, initialState);
