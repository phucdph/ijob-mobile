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
  skills: ISkill[];
  company: ISource;
  isActive: boolean;
  created_at: string;
  saved?: boolean;
  applied?: boolean;
}

export interface IJobDetail {
  id: string;
  salary: ISalary;
  name: string;
  skills: ISkill[];
  benefit: string[];
  require: string[];
  company: ISource;
  isActive: boolean;
  created_at: string;
  saved: boolean;
  applied?: boolean;
}

export interface IFeedRequest {
  limit: number;
  offset?: number;
}

