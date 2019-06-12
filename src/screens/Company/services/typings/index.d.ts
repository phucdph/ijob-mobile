import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ILocation } from 'components/Locations/services/typings';

export interface ICompany {
  id: string;
  name: string;
  avatar: string;
  email: string;
  address: string[];
  ourPeople: IOurPeople[];
  skills: ISkill[];
  follow: boolean;
  location: ILocation[];
}

interface IOurPeople {
  name: string;
  position: string;
}
