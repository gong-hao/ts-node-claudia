import * as joi from 'joi'

const validate = <T>(input, schema) => {
  return new Promise<T>((resolve, reject) => {
    joi.validate(input, schema, { stripUnknown: true }, (err, value) => {
      if (err) {
        err['errorType'] = 'InvalidParameters'
        return reject(err)
      }
      resolve(value)
    })
  })
}

export const Validator = {
  validate
}
