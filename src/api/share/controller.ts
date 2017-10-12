import * as express from 'express';

import { ErrorType } from '../../enum/errorType';

export const Controller = api => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    api(req)
      .then(result => res.status(result.statusCode).send(result))
      .catch((err: Error) => {
        const result = ErrorResult(err);
        res.status(result.statusCode).send(result);
      });
  };
};

export const ErrorResult = (error: any) => {
  console.error(error);
  switch (error.errorType) {
    case ErrorType[ErrorType.NotFound]:
      return { statusCode: 404, message: error.message ? error.message : 'not found' };
    case ErrorType[ErrorType.InvalidParameters]:
      delete error.isJoi;
      return { statusCode: 400, error: error };
    case ErrorType[ErrorType.Forbidden]:
      return { statusCode: 403, message: error.message ? error.message : 'forbidden' };
    case ErrorType[ErrorType.ServerError]:
    default:
      return { statusCode: 500, error: error.toString() };
  }
};
