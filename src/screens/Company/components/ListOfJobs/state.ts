import { ErrorState } from 'services/models/Error';


export const stateContext = 'CompanyJob';

export interface ICompanyJobState {
  action: string;
  error: ErrorState | any;
  data: string[];
}

export interface ICompaniesJobState {
  [id: string]: ICompanyJobState;
}

export const initialCompanyJobState: ICompanyJobState = {
  action: '',
  error: null,
  data: []
};

export const initialState = {};
