export interface ISkill {
  id: string;
  name: string;
}

export interface ISearchSKillRequest {
  searchText: string;
  limit: number;
  offset: number;
}
