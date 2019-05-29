import RestAPIClient from 'services/RestAPIClient';

class CompanyService extends RestAPIClient {
  constructor() {
    super('company');
  }

  getCompany = (id: string) => {
    return this.get(`/${id}`);
  };

  follow = (id: string) => {
    return this.post(`/${id}/follow`, {});
  };

  unfollow = (id: string) => {
    return this.delete(`/${id}/unfollow`);
  };
}

export const companyService = new CompanyService();
