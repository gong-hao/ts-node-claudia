import 'mocha';

import { expect } from 'chai';
import * as sinon from 'sinon';

import { Validator } from '../joi/validator';
import { CommonQuery } from '../service/commonQuery';
import { Todo } from './todo';

describe('Todo', () => {
  describe('all', () => {
    it('query 200 with Title', async () => {
      const query = { Title: 'title' };
      const req: any = { query };
      const docs = [{ foo: 'bar' }];
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findManyByQueryStub = sinon.stub(CommonQuery, 'findManyByQuery').returns(docs);
      const actual = await Todo.all(req);
      const excepted = {
        statusCode: 200,
        data: docs
      };
      validateStub.restore();
      findManyByQueryStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('query 200 without Title', async () => {
      const query = {};
      const req: any = { query };
      const docs = [{ foo: 'bar' }];
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findManyByQueryStub = sinon.stub(CommonQuery, 'findManyByQuery').returns(docs);
      const actual = await Todo.all(req);
      const excepted = {
        statusCode: 200,
        data: docs
      };
      validateStub.restore();
      findManyByQueryStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('list', () => {
    it('list 200 with Title', async () => {
      const query = { Title: 'title' };
      const req: any = { query };
      const result = { data: {}, metadata: {} };
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findWithPagingStub = sinon.stub(CommonQuery, 'findWithPaging').returns(result);
      const actual = await Todo.list(req);
      const excepted = {
        statusCode: 200,
        ...result
      };
      validateStub.restore();
      findWithPagingStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('list 200 without Title', async () => {
      const query = {};
      const req: any = { query };
      const result = { data: {}, metadata: {} };
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findWithPagingStub = sinon.stub(CommonQuery, 'findWithPaging').returns(result);
      const actual = await Todo.list(req);
      const excepted = {
        statusCode: 200,
        ...result
      };
      validateStub.restore();
      findWithPagingStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('detail', () => {
    it('detail 200', async () => {
      const query = { ID: 'ID' };
      const req: any = { query };
      const data = { foo: 'bar' };
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data);
      const actual = await Todo.detail(req);
      const excepted = {
        statusCode: 200,
        data: data
      };
      validateStub.restore();
      findOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('detail 404', async () => {
      const query = { ID: 'ID' };
      const req: any = { query };
      const data = { foo: 'bar' };
      const validateStub = sinon.stub(Validator, 'validate').returns(query);
      const findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(undefined);
      const actual = await Todo.detail(req);
      const excepted = {
        statusCode: 404,
        message: 'not found'
      };
      validateStub.restore();
      findOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('create', () => {
    it('create 200', async () => {
      const body = { Title: 'something need to do', CreateOn: new Date() };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const insertOneStub = sinon.stub(CommonQuery, 'insertOne').returns({ insertedCount: 1, insertedId: 'insertedId' });
      const actual = await Todo.create(req);
      const excepted = {
        statusCode: 201,
        data: { insertedId: 'insertedId' }
      };
      validateStub.restore();
      insertOneStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('create 500', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const insertOneStub = sinon.stub(CommonQuery, 'insertOne').returns({ insertedCount: 0 });
      const actual = await Todo.create(req);
      const excepted = { statusCode: 500, message: 'insert fail' };
      validateStub.restore();
      insertOneStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('modify', () => {
    it('modify 201', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({ modifiedCount: 1 });
      const actual = await Todo.modify(req);
      const excepted = {
        statusCode: 201
      };
      validateStub.restore();
      updateOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('modify 404', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({ modifiedCount: 0 });
      const actual = await Todo.modify(req);
      const excepted = { statusCode: 404, message: 'not found' };;
      validateStub.restore();
      updateOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('remove', () => {
    it('remove 204', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const deleteOneByIdStub = sinon.stub(CommonQuery, 'deleteOneById').returns({ deletedCount: 1 });
      const actual = await Todo.remove(req);
      const excepted = {
        statusCode: 204
      };
      validateStub.restore();
      deleteOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('remove 404', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const deleteOneByIdStub = sinon.stub(CommonQuery, 'deleteOneById').returns({ deletedCount: 0 });
      const actual = await Todo.remove(req);
      const excepted = { statusCode: 404, message: 'not found' };
      validateStub.restore();
      deleteOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('multiRemove', () => {
    it('multiRemove 204', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const deleteManyByIdsStub = sinon.stub(CommonQuery, 'deleteManyByIds').returns({ deletedCount: 3 });
      const actual = await Todo.multiRemove(req);
      const excepted = {
        statusCode: 204
      };
      validateStub.restore();
      deleteManyByIdsStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('multiRemove 404', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const deleteManyByIdsStub = sinon.stub(CommonQuery, 'deleteManyByIds').returns({ deletedCount: 0 });
      const actual = await Todo.multiRemove(req);
      const excepted = { statusCode: 404, message: 'not found' };
      validateStub.restore();
      deleteManyByIdsStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
  describe('toggle', () => {
    it('toggle 200', async () => {
      const body = { foo: 'bar' };
      const req: any = { body };
      const data = { foo: 'bar' };
      const validateStub = sinon.stub(Validator, 'validate').returns(body);
      const findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data);
      const updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({});
      const actual = await Todo.toggle(req);
      const excepted = {
        statusCode: 200
      };
      validateStub.restore();
      findOneByIdStub.restore();
      updateOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('toggle 200 has Done', async () => {
      const req: any = {};
      const data = { foo: 'bar', Done: true };
      const validateStub = sinon.stub(Validator, 'validate').returns(data);
      const findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data);
      const updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({});
      const actual = await Todo.toggle(req);
      const excepted = {
        statusCode: 200
      };
      validateStub.restore();
      findOneByIdStub.restore();
      updateOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
    it('toggle 404', async () => {
      const req: any = {};
      const validateStub = sinon.stub(Validator, 'validate').returns(req);
      const findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(undefined);
      const actual = await Todo.toggle(req);
      const excepted = { statusCode: 404, message: 'not found' };
      validateStub.restore();
      findOneByIdStub.restore();
      expect(actual).is.deep.equal(excepted);
    });
  });
});
