import RestAPIClient from 'services/RestAPIClient';

class NotificationService extends RestAPIClient {
  constructor() {
    super('notification');
  }

  // tslint:disable-next-line:variable-name
  registerToken = async (token: string, user_id: string) => {
    const res = await this.post('/register', { token, user_id });
    console.log(res);
    return res;
  };


}

export const notificationService = new NotificationService();
