import { createSelectorsA } from 'utils/redux';
import { IUserState, stateContext } from './state';
import { createSelector } from 'reselect';

const userStateSelector = createSelectorsA(stateContext);

export const currentProfileSelector = createSelector(userStateSelector, (state: IUserState) => state.data);
