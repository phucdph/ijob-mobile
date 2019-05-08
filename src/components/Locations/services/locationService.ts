import RestAPIClient from 'services/RestAPIClient';
import { ILocation } from './typings';

class LocationService extends RestAPIClient {
  constructor() {
    super('location');
  }


  getLocations = async (): Promise<ILocation[]> => {
    const res = await this.get('');
    return res.data;
  };
}

export const locationService = new LocationService();
