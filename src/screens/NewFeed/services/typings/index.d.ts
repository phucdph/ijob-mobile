export interface ISalary {
  from: number;
  to: number;
  currency: string;
}

export interface ISource {
  id: string;
  name: string;
  avatar: string;
}

export interface ISkill {
  id: string;
  name: string;
}

export interface IJob {
  id: string;
  salary: ISalary;
  name: string;
  skill: ISkill[];
  benefit: string[];
  company: ISource;
  isActive: boolean;
  created_at: string;
}

export interface IFeedRequest {
  limit: number;
  offset?: string;
}

