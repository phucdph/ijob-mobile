import { createSelectorsA } from 'utils/redux';
import { ISearchCompanyState, stateContext } from './state';

export const searchCompanySelector: (
  state: any
) => ISearchCompanyState = createSelectorsA(stateContext);
