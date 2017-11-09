import * as express from 'express'

import { TodoSchema } from '.'
import { Regex } from '../../helper/regex'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQuery } from '../../service/common-query'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<Todo[]>> => {
  const query = await Validator.validate<Todo>(req.query, TodoSchema.list())
  const conditions: any = {}
  if (query.Title) {
    conditions.Title = { $regex: Regex.escapeRegex(query.Title) }
  }
  const docs = await CommonQuery.findManyByQuery<Todo>(conditions, DocName.Todo)
  return { statusCode: 200, data: docs }
}

export const TodoAll = {
  controller
}
