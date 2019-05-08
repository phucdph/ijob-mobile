import RestAPIClient from 'services/RestAPIClient';
import { ISearchSKillRequest, ISkill } from './typings';
import { IPageableData } from 'services/models';

class SkillService extends RestAPIClient {
  constructor() {
    super('search');
  }


  searchSkill = async (req: ISearchSKillRequest): Promise<IPageableData<ISkill>> => {
    const res = await this.get('/skill', req);
    return res.data;
  };
}

export const skillService = new SkillService();
