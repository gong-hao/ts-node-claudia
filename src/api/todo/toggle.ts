import * as express from 'express'

import { IdParams } from '../../models/controller/params'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQuery } from '../../service/common-query'
import { BaseSchema } from '../../validation/base'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  const params = await Validator.validate<IdParams>(req.params, BaseSchema.id())
  const todo = await CommonQuery.findOneById<Todo>(params.ID, DocName.Todo)
  if (!todo) {
    return { statusCode: 404, message: 'todo not found' }
  }
  const isDone = !todo.IsDone
  const doneOn = isDone ? new Date() : null
  const update = {
    $set: {
      IsDone: isDone,
      DoneOn: doneOn
    }
  }
  await CommonQuery.updateOneById(todo._id, update, DocName.Todo)
  return { statusCode: 200 }
}

export const TodoToggle = {
  controller
}
