import { ErrorState } from 'services/models/Error';
import { IPageableData } from 'services/models';
import { ISearchCompany } from '../../../screens/Search/screens/SearchResult/services/typings';

export const stateContext = 'Search/Company';

export interface ISearchCompanyState {
  action: string;
  data: IPageableData<ISearchCompany>;
  error: ErrorState | null;
}

export const initialState: ISearchCompanyState = {
  action: '',
  data: {
    data: [],
    total: 0,
  },
  error: null,
};
