import * as express from 'express'

import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { CommonQueryService } from '../../service/common-query.service'
import { BaseSchema } from '../../validation/base-schema'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  const body = await Validator.validate<any>(req.body, BaseSchema.ids())
  const result = await CommonQueryService.deleteManyByIds(body.IDs, DocName.Todo)
  if (result.deletedCount === 0) {
    return { statusCode: 404, message: 'todo not found' }
  }
  return { statusCode: 204 }
}

export const TodoMultiRemove = {
  controller
}
