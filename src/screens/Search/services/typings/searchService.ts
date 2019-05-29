import RestAPIClient from 'services/RestAPIClient';
import { ISearchRequest } from '../../screens/SearchResult/services/typings';
import { omit } from 'lodash';
import { IPageableData } from 'services/models';
import { ISearchSKillRequest, ISkill } from 'components/Search/SearchSkill/services/typings';
import { ISearchCompanyRequest } from 'components/Search/SearchCompany/services/typings';
import { ISearchHistory } from './index';

class SearchService extends RestAPIClient {
  constructor() {
    super('search');
  }

  searchJob = async (req: Readonly<ISearchRequest>) => {
    const res = await this.get('/job', omit(req, ['searchType']));
    return res.data;
  };

  searchCompany = async (req: Readonly<ISearchCompanyRequest | ISearchRequest>) => {
    const res = await this.get('/company', omit(req, ['searchType']));
    return res.data;
  };

  searchSkill = async (req: ISearchSKillRequest): Promise<IPageableData<ISkill>> => {
    const res = await this.get('/skill', req);
    return res.data;
  };

  getHistory = async () => {
    return (await this.get('/history')).data;
  };

  createHistory = async (req: ISearchHistory) => {
    return (await this.post('/history', req)).data;
  }
}

export const searchService = new SearchService();
