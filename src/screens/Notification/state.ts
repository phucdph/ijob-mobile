import { ErrorState } from 'services/models/Error';
import { INotification } from './services/typings';
import { IPageableData } from 'services/models';

export const stateContext = 'Notifications';

export interface INotificationState {
  action: string;
  data: IPageableData<INotification>;
  error: ErrorState | null;
}

export const initialState: INotificationState = {
  action: '',
  data: {
    data: [],
    total: 0
  },
  error: null,
};
