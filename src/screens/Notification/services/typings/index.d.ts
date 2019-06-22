export interface INotification {
  id: string;
  job: {
    id: string;
    name: string;
  },
  company: {
    id: string;
    name: string;
    avatar: string;
  },
  created_at: string;
}

export interface INotificationRequest {
  limit: number;
  offset: number;
}
