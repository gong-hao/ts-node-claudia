import { ErrorType } from '../../enum/errorType';

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
