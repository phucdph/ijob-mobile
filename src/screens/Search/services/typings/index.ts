export interface ISearchHistory {
  id?: string;
  name: string;
  type: SearchHistoryType;
  content: any;
}

export enum SearchHistoryType {
  TEXT = 'text',
  JOB = 'job',
  COMPANY = 'company'
}
