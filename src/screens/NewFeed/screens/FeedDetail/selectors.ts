import { createSelectorsA } from 'utils/redux';
import { initialState, stateContext } from './state';
import { get } from 'lodash';
import { jobItemSelector } from '../../selectors';
import { IJob, IJobDetail } from '../../services/typings';
import { IJobsState } from '../../state';

const jobsDetailStateSelector = createSelectorsA(stateContext);

export const jobDetailStateSelector = (state: any, { id }: {id: string}): IJobsState => {
  return get(jobsDetailStateSelector(state), id, initialState)
};

export const jobDetailDataStateSelector = (state: any, { id }: {id: string}): IJobDetail | IJob => {
  const jobDetailData = get(jobsDetailStateSelector(state), `${id}.data`, {});
  if (!jobDetailData.id) {
    return jobItemSelector(state, { id });
  }
  return jobDetailData;
};
