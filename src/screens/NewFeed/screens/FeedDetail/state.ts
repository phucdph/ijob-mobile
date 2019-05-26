import { ErrorState } from 'services/models/Error';
import { IJobDetail } from '../../services/typings';

export const stateContext = 'JobDetail';


export interface IJobDetailState {
  action: string;
  data: IJobDetail | any;
  error: ErrorState | string;
}

export interface IJobsDetailState {
  [id: string]:IJobDetailState
}

export const jobDetailInitialState = {
  action: '',
  data: {},
  error: '',
};

export const initialState = {};
