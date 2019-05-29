import { ISkill } from 'components/Search/SearchSkill/services/typings';

export interface ICompany {
  id: string;
  name: string;
  avatar: string;
  email: string;
  address: string[];
  ourPeople: IOurPeople[];
  skills: ISkill[];
  follow: boolean;
}

interface IOurPeople {
  name: string;
  position: string;
}
