import { stateContext, initialCompanyState, ICompanyState } from './state';
import { createSelectorsA } from 'utils/redux';
import { get } from 'lodash';

const companiesSelector = createSelectorsA(stateContext);

export const companyStateSelector = (state: any, { id } : {id: string}): ICompanyState => {
  return get(companiesSelector(state), id, initialCompanyState);
};
