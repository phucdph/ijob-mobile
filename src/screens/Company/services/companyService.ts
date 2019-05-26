import RestAPIClient from 'services/RestAPIClient';

class CompanyService extends RestAPIClient {
  constructor() {
    super('company');
  }

  getCompany = (id: string) => {
    return this.get(`/${id}`);
  };
}

export const companyService = new CompanyService();
