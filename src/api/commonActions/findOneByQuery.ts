import { GetDb } from '../share/getDb';

export const FindOneByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).findOne(conditions);
};
