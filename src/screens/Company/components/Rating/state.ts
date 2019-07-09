import { ErrorState } from 'services/models/Error';
import { IRating } from './services/typings';


export const stateContext = 'CompanyRating';

export interface IRatingState {
  action: string;
  error: ErrorState | any;
  data: IRating;
}

export interface IRatingsState {
  [id: string]: IRatingState;
}

export const initialRatingData = {
  comments: []
};

export const initialRatingState: IRatingState = {
  action: '',
  error: null,
  data: initialRatingData
};

export const initialState = {};
