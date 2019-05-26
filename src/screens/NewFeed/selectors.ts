import { createSelectorsA } from 'utils/redux';
import { IJobsState, initialJobItem, stateContext } from './state';
import { createSelector } from 'reselect';
import { get } from 'lodash';

export const [actionSelector, errorSelector] = createSelectorsA(stateContext, [
  'action',
  'error',
]);

export const jobsStateSelector = createSelectorsA(stateContext);

export const jobDataSelector = createSelector(jobsStateSelector, (state: IJobsState) => state.data);

export const jobItemSelector = (state: any, { id }: {id: string}) => {
  const jobsState = jobsStateSelector(state);
  return get(jobsState, `jobs.${id}`, initialJobItem);
};
