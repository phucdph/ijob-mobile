import { ISkill } from 'components/Skills/services/typings';
import { ILocation } from 'components/Locations/services/typings';

export interface ISearchJob {}

export interface ISearchCompany {
  id: string;
  name: string;
  avatar: string;
  skills: ISkill[];
  location: ILocation[]
}

export enum SearchType {
  ALL = 'ALL',
  JOB = 'JOB',
  COMPANY = 'COMPANY'
}

export interface ISearchRequest {
  searchText: string;
  searchType: SearchType;
  limit: number;
  offset: number
  location_ids?: string[];
  company_ids?: string[];
}
