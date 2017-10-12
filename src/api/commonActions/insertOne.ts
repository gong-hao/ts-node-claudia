import { GetDb } from '../share/getDb';

export const InsertOne = async<T>(data: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).insertOne(data, { w: 1 });
};
