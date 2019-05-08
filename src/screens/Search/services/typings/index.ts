export interface ISearchHistory {
  id: string;
  name: string;
  type: SearchHistoryType;
}

export enum SearchHistoryType {
  TEXT = 'text',
  JOB = 'job',
  COMPANY = 'company'
}
