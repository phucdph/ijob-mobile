import RestAPIClient from 'services/RestAPIClient';
import { IJob, IFeedRequest } from './typings';
import { IPageableData } from 'services/models';

class NewfeedService extends RestAPIClient {
  constructor() {
    super('job');
  }

  getFeeds = (req: IFeedRequest): Promise<IPageableData<IJob>> => {
    return this.get('',req);
  };
}

export const newfeedService = new NewfeedService();
