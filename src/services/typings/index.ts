import { BaseAction } from 'redux-actions';

export interface Action<Payload> extends BaseAction {
  payload: Payload;
  error?: boolean;
}

export interface ICloudiaryImage {
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
}
