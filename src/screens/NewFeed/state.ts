import { ErrorState } from 'services/models/Error';
import { IJob } from './services/typings';

export const stateContext = 'Feed';


export interface IFeedState {
  action: string;
  data: {
    data: IJob[],
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
