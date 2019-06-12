import { stateContext, initialCompanyJobState, ICompanyJobState } from './state';
import { createSelectorsA } from 'utils/redux';
import { get } from 'lodash';

const companiesJobSelector = createSelectorsA(stateContext);

export const companyJobStateSelector = (state: any, { id } : {id: string}): ICompanyJobState => {
  return get(companiesJobSelector(state), id, initialCompanyJobState);
};
