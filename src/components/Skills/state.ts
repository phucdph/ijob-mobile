import { ErrorState } from 'services/models/Error';
import { ISkill } from './services/typings';
import { IPageableData } from 'services/models';

export const stateContext = 'Locations';

export interface ILocationState {
  action: string;
  data: IPageableData<ISkill>;
  error: ErrorState | null;
}

export const initialState: ILocationState = {
  action: '',
  data: {
    data: [],
    total: 0,
  },
  error: null,
};
