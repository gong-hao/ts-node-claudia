import { GetDb } from '../../conn';

export const FindOneByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).findOne(conditions);
};
