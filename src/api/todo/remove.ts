import * as express from 'express'

import { IdParams } from '../../models/controller/params'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { CommonQueryService } from '../../service/common-query.service'
import { BaseSchema } from '../../validation/base-schema'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  const params = await Validator.validate<IdParams>(req.params, BaseSchema.id())
  const result = await CommonQueryService.deleteOneById(params.ID, DocName.Todo)
  if (result.deletedCount === 0) {
    return { statusCode: 404, message: 'todo not found' }
  }
  return { statusCode: 204 }
}

export const TodoRemove = {
  controller
}
