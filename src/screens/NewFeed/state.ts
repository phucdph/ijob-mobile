import { ErrorState } from 'services/models/Error';
import { IFeed } from './services/typings';

export const stateContext = 'Feed';


export interface IFeedState {
  action: string;
  data: {
    data: IFeed[],
    total: number,
  };
  error: ErrorState;
}

export const initialState = {
  action: '',
  data: {
    data: [],
    total: 0,
  },
  error: '',
};
