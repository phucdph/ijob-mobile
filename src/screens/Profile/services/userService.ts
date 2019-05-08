import RestAPIClient from 'services/RestAPIClient';
import { IUser } from './typings';

class UserService extends RestAPIClient {
  constructor() {
    super('');
  }

  getUserProfile = async (id?: string): Promise<IUser> => {
    return (await this.get(`user/${id}`, {})).data;
  };

  getMyProfile = async (): Promise<IUser> => {
    const res = await this.get('auth/validateToken');
    return res.data.profile;
  };
}

export const userService = new UserService();
