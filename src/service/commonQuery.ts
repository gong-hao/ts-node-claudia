import { ObjectID } from 'mongodb';

import { ConvertObjectID, ConvertObjectIDs } from '../helper/convertObjectID';
import { GetPaging } from '../helper/paging';
import { IPaging } from '../interface/paging';
import { DbClient } from './dbClient';

const insertOne = async<T>(data: any, collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).insertOne(data, { w: 1 });
};

const insertMany = async<T>(data: any[], collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).insertMany(data, { w: 1 });
};

export const updateOneById = async<T>(id: string | ObjectID, data: any, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return updateOneByQuery<T>(conditions, data, collectionName);
};

export const updateOneByQuery = async<T>(conditions: any, data: any, collectionName: string) => {
  const db = await DbClient.getDb();
  const update = {
    $set: data
  };
  return db.collection<T>(collectionName).updateOne(conditions, update);
};

const updateManyByIds = async<T>(ids: string[] | ObjectID[], data: any[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return updateManyByQuery<T>(conditions, data, collectionName);
};

const updateManyByQuery = async<T>(conditions: any, data: any[], collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).updateMany(conditions, { $set: data });
};

const deleteOneById = async<T>(id: string | ObjectID, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return deleteOneByQuery<T>(conditions, collectionName);
};

const deleteOneByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).deleteOne(conditions);
};

const deleteManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return deleteManyByQuery<T>(conditions, collectionName);
};

const deleteManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).deleteMany(conditions);
};

const findOneById = async<T>(id: string | ObjectID, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return findOneByQuery<T>(conditions, collectionName);
};

const findOneByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).findOne(conditions);
};

export const findManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return findManyByQuery<T>(conditions, collectionName);
};

const findManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await DbClient.getDb();
  return db.collection<T>(collectionName).find(conditions).toArray();
};

const findWithPaging = async<T>(
  conditions: any,
  collectionName: string,
  url: string,
  paging: IPaging,
  defaultSortObj = { CreateOn: -1 }) => {
  const db = await DbClient.getDb();
  const dbQuery = db.collection<T>(collectionName).find(conditions);
  const count = await dbQuery.count();
  const metadata = GetPaging(count, paging, url, defaultSortObj);
  const data = await dbQuery
    .sort(metadata.sort)
    .skip(paging.Limit * (paging.Page - 1))
    .limit(paging.Limit)
    .toArray();
  return { data, metadata };
};

export const CommonQuery = {
  insertOne,
  insertMany,
  updateOneById,
  updateOneByQuery,
  updateManyByIds,
  updateManyByQuery,
  deleteOneById,
  deleteOneByQuery,
  deleteManyByIds,
  deleteManyByQuery,
  findOneById,
  findOneByQuery,
  findManyByIds,
  findManyByQuery,
  findWithPaging
};
