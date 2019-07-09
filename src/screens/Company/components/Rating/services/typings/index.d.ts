export interface IRating {
  comments: IComment[];
}

export interface ISource {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IComment {
  content: string;
  rating: number;
  source: ISource | null;
}
