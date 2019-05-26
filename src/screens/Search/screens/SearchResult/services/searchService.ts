import RestAPIClient from 'services/RestAPIClient';
import { ISearchRequest } from './typings';
import { omit } from 'lodash';
import { IPageableData } from 'services/models';
import { ISearchSKillRequest, ISkill } from 'components/Search/SearchSkill/services/typings';
import { ISearchCompanyRequest } from 'components/Search/SearchCompany/services/typings';

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
}

export const searchService = new SearchService();
