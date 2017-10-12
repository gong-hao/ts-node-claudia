import { GetDb } from '../../conn';

export const DeleteManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).deleteMany(conditions);
};
