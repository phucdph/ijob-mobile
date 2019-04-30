import { createSelectorsA } from 'utils/redux';
import { IFeedState, stateContext } from './state';
import { createSelector } from 'reselect';

export const [actionSelector, errorSelector] = createSelectorsA(stateContext, [
  'action',
  'error',
]);

const feedStateSelector = createSelectorsA(stateContext);

export const feedDataSelector = createSelector(feedStateSelector, (state: IFeedState) => state.data);
