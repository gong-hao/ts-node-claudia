import * as express from 'express'

import { IdParams } from '../../models/controller/params'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { CommonQuery } from '../../service/common-query'
import { BaseSchema } from '../../validation/base'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  const params = await Validator.validate<IdParams>(req.params, BaseSchema.id())
  const result = await CommonQuery.deleteOneById(params.ID, DocName.Todo)
  if (result.deletedCount === 0) {
    return { statusCode: 404, message: 'todo not found' }
  }
  return { statusCode: 204 }
}

export const TodoRemove = {
  controller
}
