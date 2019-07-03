import RestAPIClient from 'services/RestAPIClient';
import { AsyncStorage } from 'react-native';

class AuthService extends RestAPIClient {
  constructor() {
    super('');
  }

  signUp = (req: ISignUpRequest) => {
    return this.post('/auth/register', req);
  };

  signIn = (req: ISignInRequest) => {
    return this.post('/auth/login', req);
  };

  signOut = () => {
    return this.delete('/user/logout');
  };

  checkTokenValid = async () => {
    return (await this.get('/auth/validateToken')).data;
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
