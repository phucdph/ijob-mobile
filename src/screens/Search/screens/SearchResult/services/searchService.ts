import RestAPIClient from 'services/RestAPIClient';
import { ISearchRequest } from './typings';
import { omit } from 'lodash';

class SearchService extends RestAPIClient {
  constructor() {
    super('search');
  }

  searchJob = async (req: Readonly<ISearchRequest>) => {
    const res = await this.get('/job', omit(req, ['searchType']));
    return res.data;
  };

  searchCompany = async (req: Readonly<ISearchRequest>) => {
    const res = await this.get('/company', omit(req, ['searchType']));
    return res.data;
  }
}

export const searchService = new SearchService();
