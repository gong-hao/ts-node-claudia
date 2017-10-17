import * as joi from 'joi';

export const Validator = {
  validate: <T>(input, schema) => {
    return new Promise<T>((resolve, reject) => {
      joi.validate(input, schema, { stripUnknown: true }, (err, value) => {
        if (err) {
          err['errorType'] = 'InvalidParameters';
          return reject(err);
        }
        resolve(value);
      });
    });
  }
}
