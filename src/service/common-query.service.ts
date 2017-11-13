import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  InsertWriteOpResult,
  ObjectID,
  UpdateWriteOpResult,
} from 'mongodb'

import { ConvertHelper } from '../helper/convert.helper'
import { PagingHelper } from '../helper/paging.helper'
import { PagingQuery } from '../models/controller/query'
import { Metadata } from '../models/controller/result'
import { DbClientService } from './db-client.service'

const insertOne = async<T>(data: any, collectionName: string): Promise<InsertOneWriteOpResult> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).insertOne(data, { w: 1 })
}

const insertMany = async<T>(data: any[], collectionName: string): Promise<InsertWriteOpResult> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).insertMany(data, { w: 1 })
}

const updateOneById = async<T>(id: string | ObjectID, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const conditions = {
    _id: ConvertHelper.toObjectID(id)
  }
  return updateOneByQuery<T>(conditions, update, collectionName)
}

const updateOneByQuery = async<T>(conditions: any, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).updateOne(conditions, update)
}

const updateManyByIds = async<T>(ids: string[] | ObjectID[], update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const conditions = {
    _id: { $in: ConvertHelper.toObjectIDs(ids) }
  }
  return updateManyByQuery<T>(conditions, update, collectionName)
}

const updateManyByQuery = async<T>(conditions: any, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).updateMany(conditions, update)
}

const deleteOneById = async<T>(id: string | ObjectID, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const conditions = {
    _id: ConvertHelper.toObjectID(id)
  }
  return deleteOneByQuery<T>(conditions, collectionName)
}

const deleteOneByQuery = async<T>(conditions: any, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).deleteOne(conditions)
}

const deleteManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const conditions = {
    _id: { $in: ConvertHelper.toObjectIDs(ids) }
  }
  return deleteManyByQuery<T>(conditions, collectionName)
}

const deleteManyByQuery = async<T>(conditions: any, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).deleteMany(conditions)
}

const findOneById = async<T>(id: string | ObjectID, collectionName: string): Promise<T> => {
  const conditions = {
    _id: ConvertHelper.toObjectID(id)
  }
  return findOneByQuery<T>(conditions, collectionName)
}

const findOneByQuery = async<T>(conditions: any, collectionName: string): Promise<T> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).findOne(conditions)
}

const findManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string): Promise<T[]> => {
  const conditions = {
    _id: { $in: ConvertHelper.toObjectIDs(ids) }
  }
  return findManyByQuery<T>(conditions, collectionName)
}

const findManyByQuery = async<T>(conditions: any, collectionName: string): Promise<T[]> => {
  const db = await DbClientService.getDb()
  return db.collection<T>(collectionName).find(conditions).toArray()
}

const findWithPaging = async<T>(
  conditions: any,
  collectionName: string,
  url: string,
  paging: PagingQuery,
  defaultSortObj: any = { CreateOn: -1 }): Promise<{ data: T[], metadata: Metadata }> => {
  const db = await DbClientService.getDb()
  const dbQuery = db.collection<T>(collectionName).find(conditions)
  const count = await dbQuery.count()
  const metadata = PagingHelper.getPaging(count, paging, url, defaultSortObj)
  const data = await dbQuery
    .sort(metadata.sort)
    .skip(paging.Limit * (paging.Page - 1))
    .limit(paging.Limit)
    .toArray()
  return { data, metadata }
}

export const CommonQueryService = {
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
}
