export interface IResult<T> {
  statusCode: number;
  data?: T;
  metadata?: any;
  message?: string;
  error?: any;
}
