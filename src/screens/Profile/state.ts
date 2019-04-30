import { ErrorState } from 'services/models/Error';
import { IUser } from './services/typings';

export const stateContext = 'MyProfile';

export interface IUserState {
  action: string;
  data: IUser;
  error: ErrorState | null;
}

export const initialState: IUserState = {
  action: '',
  data: {
    _id: '',
    id: '',
    firstName: '',
    lastName: '',
    avatar: '',
    createdAt: ''
  },
  error: null,
};
