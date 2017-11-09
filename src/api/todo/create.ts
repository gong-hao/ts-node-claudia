import * as express from 'express'

import { TodoSchema } from '.'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQuery } from '../../service/common-query'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  const body = await Validator.validate<Todo>(req.body, TodoSchema.create())
  const result = await CommonQuery.insertOne<Todo>(body, DocName.Todo)
  if (result.insertedCount === 0) {
    return { statusCode: 500, message: 'insert failed' }
  }
  return { statusCode: 201, data: { insertedId: result.insertedId } }
}

export const TodoCreate = {
  controller
}
