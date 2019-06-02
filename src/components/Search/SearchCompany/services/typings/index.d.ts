
export interface ISearchCompanyRequest {
  searchText: string;
  limit: number;
  offset: number;
  excluded_ids: string[];
}
