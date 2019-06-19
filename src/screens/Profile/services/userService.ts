import RestAPIClient from 'services/RestAPIClient';
import { IUser } from './typings';
import { pick } from 'lodash';

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

  update = async (req:Partial<IUser>): Promise<IUser> => {
    const id = req.id;
    const request = pick(req, ['id', 'firstName', 'lastName', 'avatar', 'location', 'skills']);
    const res = (await this.put(`user/${id}`, request)).data;
    delete res.password;
    delete res.confirmPassword;
    return res;
  };

  savePushToken = (token: string, userId: string) => {
    return this.post('user', {
      token, userId
    })
  }
}

export const userService = new UserService();
