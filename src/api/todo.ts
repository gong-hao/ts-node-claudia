import * as express from 'express';

import { DocName } from '../enum/docName';
import { escapeStringRegex } from '../helper/escapeStringRegex';
import { IIdParams, IPaging, IResult } from '../interface/controller';
import { ITodo } from '../interface/todo';
import { IdSchema, PagingSchema, Validator } from '../joi/controller';
import { CreateTodoSchema, ModifyTodoSchema, QueryTodoSchema } from '../joi/todo';
import { CommonQuery } from '../service/commonQuery';

export const all = async (req: express.Request): Promise<IResult<ITodo[]>> => {
  const query = await Validator.validate<ITodo>(req.query, QueryTodoSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: escapeStringRegex(query.Title) }
  }
  const docs = await CommonQuery.findManyByQuery<ITodo>(conditions, DocName.Todos);
  return { statusCode: 200, data: docs };
};

export const list = async (req: express.Request): Promise<IResult<ITodo[]>> => {
  const query = await Validator.validate<ITodo>(req.query, QueryTodoSchema);
  const paging = await Validator.validate<IPaging>(req.query, PagingSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: escapeStringRegex(query.Title) }
  }
  const result = await CommonQuery.findWithPaging<ITodo>(conditions, DocName.Todos, req.url, paging);
  return { statusCode: 200, ...result };
};

const detail = async (req: express.Request): Promise<IResult<ITodo>> => {
  const query = await Validator.validate<IIdParams>(req.params, IdSchema);
  const todo = await CommonQuery.findOneById<ITodo>(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 200, data: todo };
};

const create = async (req: express.Request): Promise<IResult<any>> => {
  const body = await Validator.validate<ITodo>(req.body, CreateTodoSchema);
  const result = await CommonQuery.insertOne<ITodo>(body, DocName.Todos);
  if (result.insertedCount === 0) {
    return { statusCode: 500, message: 'insert fail' };
  }
  return { statusCode: 201, data: { insertedId: result.insertedId } };
};

const modify = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator.validate<IIdParams>(req.params, IdSchema);
  const body = await Validator.validate<ITodo>(req.body, ModifyTodoSchema);
  const result = await CommonQuery.updateOneById(query.ID, body, DocName.Todos);
  if (result.modifiedCount === 0) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 201 };
};

const remove = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator.validate<IIdParams>(req.params, IdSchema);
  const result = await CommonQuery.deleteOneById(query.ID, DocName.Todos);
  if (result.deletedCount === 0) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 204 };
};

const multiRemove = async (req: express.Request): Promise<IResult<any>> => {
  const body = await Validator.validate<any>(req.body, IdSchema);
  const result = await CommonQuery.deleteManyByIds(body.IDs, DocName.Todos)
  if (result.deletedCount === 0) {
    return { statusCode: 404, message: 'not found' };
  }
  return { statusCode: 204 };
};

const toggle = async (req: express.Request): Promise<IResult<any>> => {
  const query = await Validator.validate<IIdParams>(req.params, IdSchema);
  const todo = await CommonQuery.findOneById<ITodo>(query.ID, DocName.Todos);
  if (!todo) {
    return { statusCode: 404, message: 'not found' };
  }
  const Done = !todo.Done;
  const DoneOn = Done ? new Date() : null;
  const data = { Done, DoneOn };
  await CommonQuery.updateOneById(todo._id, data, DocName.Todos);
  return { statusCode: 200 };
};

export const Todo = {
  all,
  list,
  detail,
  create,
  modify,
  remove,
  multiRemove,
  toggle
};
