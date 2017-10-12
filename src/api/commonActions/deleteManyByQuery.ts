import { GetDb } from '../share/getDb';

export const DeleteManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).deleteMany(conditions);
};
