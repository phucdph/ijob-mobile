import RestAPIClient from 'services/RestAPIClient';
import { IFeed, IFeedRequest } from './typings';
import { IPageableData } from 'services/models';

class NewfeedService extends RestAPIClient {
  constructor() {
    super('job');
  }

  getFeeds = (req: IFeedRequest): Promise<IPageableData<IFeed>> => {
    return this.get('',req);
  };
}

export const newfeedService = new NewfeedService();
