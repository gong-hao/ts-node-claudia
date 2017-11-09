import * as express from 'express'
import { ErrorType } from '../models/controller/error'

const _getErrorResult = (error: any) => {
  switch (error.errorType) {
    case ErrorType[ErrorType.NotFound]:
      return {
        statusCode: 404,
        message: error.message ? error.message : 'not found'
      }
    case ErrorType[ErrorType.InvalidParameters]:
      delete error.isJoi
      return {
        statusCode: 400,
        message: 'invalid parameters',
        error: error
      }
    case ErrorType[ErrorType.Forbidden]:
      return {
        statusCode: 403,
        message: error.message ? error.message : 'forbidden'
      }
    case ErrorType[ErrorType.ServerError]:
    default:
      // todo: email to admin
      console.error(error)
      return {
        statusCode: 500,
        message: error.message ? error.message : 'server error',
        error: error.toString()
      }
  }
}

const api = api => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    api(req)
      .then(result => res.status(result.statusCode).send(result))
      .catch((err: Error) => {
        const result = _getErrorResult(err)
        res.status(result.statusCode).send(result)
      })
  }
}

export const Controller = {
  _getErrorResult,
  api
}
