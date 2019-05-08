import { createSelectorsA } from 'utils/redux';
import { ILocationState, stateContext } from './state';
import { createSelector } from 'reselect';

export const locationStateSelector: (
  state: any
) => ILocationState = createSelectorsA(stateContext);

export const locationDataStateSelector = createSelector(
  locationStateSelector,
  (state: ILocationState) => state.data
);
