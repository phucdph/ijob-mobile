import RestAPIClient from 'services/RestAPIClient';
import { INotificationRequest } from './typings';

class NotificationService extends RestAPIClient {
  constructor() {
    super('notification');
  }

  // tslint:disable-next-line:variable-name
  registerToken = async (token: string, user_id: string) => {
    return await this.post('/register', { token, user_id });
  };

  getNotification = async (req: INotificationRequest) => {
    return (await this.get('', req)).data;
  }


}

export const notificationService = new NotificationService();
