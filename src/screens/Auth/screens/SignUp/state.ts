import { ErrorState } from 'services/models/Error';

export const stateContext: string = 'signUp';

export class SignUpState {
  action: string = '';
  error: ErrorState | null = null;
  constructor(...params: any[]) {
    Object.assign(this, params);
  }
}

export default new SignUpState();
