import { ErrorState } from 'services/models/Error';
import { ICompany } from './services/typings';
import { ISearchCompany } from '../Search/screens/SearchResult/services/typings';

export const stateContext = 'Company';

export interface ICompanyState {
  action: string;
  error: ErrorState | any;
  data: ICompany | ISearchCompany;
}

export interface ICompaniesState {
  [id: string]: ICompanyState;
}

export const initialCompanyData: ICompany = {
  id: '',
  name: '',
  avatar: '',
  address: [],
  ourPeople: [],
  skills: [],
  email: '',
  follow: false,
};

export const initialCompanyState: ICompanyState = {
  action: '',
  error: null,
  data: initialCompanyData
};

export const initialState = {};
