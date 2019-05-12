import { createSelectorsA } from 'utils/redux';
import { IUserState, stateContext } from './state';
import { createSelector } from 'reselect';
import { get } from 'lodash';

export const userStateSelector = createSelectorsA(stateContext);

export const currentProfileSelector = createSelector(
  userStateSelector,
  (state: IUserState) => state.data
);

export const currentSkillSelector = createSelector(
  userStateSelector,
  (state: IUserState) => get(state, 'data.skill', [])
);
