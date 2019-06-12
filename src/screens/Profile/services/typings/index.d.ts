import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ILocation } from 'components/Locations/services/typings';
import { IJob } from '../../../NewFeed/services/typings';

export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  created_at: string;
  location?: ILocation;
  email: string;
  token?: string;
  skills?: ISkill[];
  saveJob?: string[];
  followCompany?: string[];
}
