import { ErrorState } from 'services/models/Error';
import { IJob } from './services/typings';
import { initialCompanyData } from '../Company/state';

export const stateContext = 'Feed';


export interface IJobsState {
  action: string;
  data: {
    data: string[],
    total: number,
  };
  jobs: {[id: string]: IJob}
  error: ErrorState;
}

export const initialJobItem: IJob = {
  id: '',
  name: '',
  salary: null as any,
  skills: [],
  isActive: true,
  created_at: '',
  company: initialCompanyData as any
};

export const initialState = {
  action: '',
  data: {
    data: [],
    total: 0,
  },
  jobs: {},
  error: '',
};
