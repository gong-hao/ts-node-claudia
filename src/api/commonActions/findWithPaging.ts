import { IPaging } from '../../interface/paging';
import { GetDb } from '../share/getDb';
import { GetPaging } from './share/paging';

export const FindWithPaging = async<T>(
  conditions: any,
  collectionName: string,
  url: string,
  paging: IPaging,
  defaultSortObj = { CreateOn: -1 }) => {
  const db = await GetDb();
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
