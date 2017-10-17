export interface IIdParams {
  ID?: string;
}

export interface IPaging {
  Page?: number;
  Limit?: number;
  Sort?: string;
}

export interface IResult<T> {
  statusCode: number;
  data?: T;
  metadata?: any;
  message?: string;
  error?: any;
}
