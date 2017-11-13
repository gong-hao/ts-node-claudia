import * as express from 'express'

import { TodoSchema } from '.'
import { Regex } from '../../helper/regex'
import { PagingQuery } from '../../models/controller/query'
import { PagingResult } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQueryService } from '../../service/common-query.service'
import { BaseSchema } from '../../validation/base-schema'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<PagingResult<Todo[]>> => {
  const query = await Validator.validate<Todo>(req.query, TodoSchema.list())
  const paging = await Validator.validate<PagingQuery>(req.query, BaseSchema.paging())
  const conditions: any = {}
  if (query.Title) {
    conditions.Title = { $regex: Regex.escapeRegex(query.Title) }
  }
  const result = await CommonQueryService.findWithPaging<Todo>(conditions, DocName.Todo, req.url, paging)
  return { statusCode: 200, ...result }
}

export const TodoList = {
  controller
}
