import RestAPIClient from 'services/RestAPIClient';
import { AsyncStorage } from 'react-native';

class AuthService extends RestAPIClient {
  constructor() {
    super('auth');
  }

  signUp = (req: ISignUpRequest) => {
    return this.post('/register', req);
  };

  signIn = (req: ISignInRequest) => {
    return this.post('/login', req);
  };

  checkTokenValid = async () => {
    return (await this.post('/validateToken', {})).data;
  };

  presistAuth = async (req: ISignUpRequest) => {
    await AsyncStorage.setItem('@IJOB/user', JSON.stringify(req));
  };

  clearPresistAuth = async () => {
    await AsyncStorage.removeItem('@IJOB/user');
  };

  getPresistedAuth = async () => {
    return JSON.parse((await AsyncStorage.getItem('@IJOB/user')) || '{}');
  };
}

export const authService = new AuthService();
