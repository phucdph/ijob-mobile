import { IPageableData } from 'services/models';
import { ISearchCompany, ISearchJob, ISearchRequest, SearchType } from './services/typings';
import { PAGE_SIZE } from '../../../NewFeed/constants';

export const stateContext: string = 'search';

export interface IState {
  action: string;
  error: any
  companies: IPageableData<ISearchCompany>,
  jobs: IPageableData<ISearchJob>,
  req: ISearchRequest,
}

export const initialState: IState = {
  action: '',
  error: null,
  companies: {
    data: [],
    total: 0
  },
  jobs: {
    data: [],
    total: 0
  },
  req: {
    searchType: SearchType.ALL,
    searchText: '',
    offset: 0,
    limit: PAGE_SIZE
  }
};
