export const stateContext: string = 'signIn';
import { ErrorState } from 'services/models/Error';

export class SignInState {
  action: string = '';
  error: ErrorState | null = null;
  constructor(...params: any[]) {
    Object.assign(this, params);
  }
}

export default new SignInState();
