export interface IAppState {
  type: UserType;
  action: string;
}

export enum UserType {
  USER,
  GUEST,
}

export const initialState: IAppState = {
  type: '' as any,
  action: ''
};

export const stateContext = 'AppState';
