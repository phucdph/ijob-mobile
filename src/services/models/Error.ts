export class ErrorState {
  status: string = '';
  error: any = null;
  data: any = null;
  constructor(...params: any[]) {
    Object.assign(this, params);
  }
}

export interface IError {
  status: string;
  error: any;
  data: any;
}
