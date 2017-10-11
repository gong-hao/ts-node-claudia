import { GetDb } from '../../conn';
import { GetMetadata } from './share/getMetadata';
import { GetSortObject } from './share/getSortObject';

export const FindWithPaging = async<T>(
  conditions: any,
  collectionName: string,
  url: string,
  paging: any,
  defaultSortObj = { CreateOn: -1 }) => {
  const db = await GetDb();
  paging.Sort = GetSortObject(paging.Sort, defaultSortObj);
  const dbQuery = db.collection<T>(collectionName).find(conditions);
  const count = await dbQuery.count();
  const metadata = GetMetadata(count, paging, url);
  const docs = await dbQuery
    .sort(paging.Sort)
    .skip(paging.Limit * (paging.Page - 1))
    .limit(paging.Limit)
    .toArray();
  return { docs, metadata };
};
