import { ISearchHistory } from '../../services/typings';

export const stateContext: string = 'search/history';

export interface ISearchHistoryState {
  action: string;
  error: any;
  data: ISearchHistory[];
}

export const initialState: ISearchHistoryState = {
  action: '',
  error: null,
  data: [],
};
