import RestAPIClient from 'services/RestAPIClient';
import { ILocation } from './typings';
import { get } from 'lodash';

class LocationService extends RestAPIClient {
  constructor() {
    super('location');
  }


  getLocations = async (): Promise<ILocation[]> => {
    const res = await this.get('');
    return get(res, 'data.data', []);
  };
}

export const locationService = new LocationService();
