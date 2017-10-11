import * as express from 'express';

import { ErrorResult } from './errorResult';

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
