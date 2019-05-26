import RestAPIClient from 'services/RestAPIClient';
import { IJob, IFeedRequest } from './typings';
import { IPageableData } from 'services/models';

class JobService extends RestAPIClient {
  constructor() {
    super('job');
  }

  getFeeds = (req: IFeedRequest): Promise<IPageableData<IJob>> => {
    return this.get('',req);
  };

  saveJob = (id: string) => {
    return this.post(`/${id}/save`, {});
  };

  unsaveJob = (id: string) => {
    return this.post(`/${id}/unsave`, {});
  };

  getJob = (id: string) => {
    return this.get(`/${id}`);
  }
}

export const jobService = new JobService();
