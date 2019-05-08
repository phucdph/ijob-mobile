import { ErrorState } from 'services/models/Error';
import { ILocation } from './services/typings';

export const stateContext = 'Locations';

export interface ILocationState {
  action: string;
  data: ILocation[];
  error: ErrorState | null;
}

export const initialState: ILocationState = {
  action: '',
  data: [],
  error: null,
};
