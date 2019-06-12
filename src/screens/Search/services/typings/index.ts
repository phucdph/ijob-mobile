export interface ISearchHistory {
  id: string;
  name: string;
  type: SearchHistoryType;
  content: string;
}

export enum SearchHistoryType {
  TEXT = 'text',
  JOB = 'job',
  COMPANY = 'company'
}
