import { ObjectID } from 'mongodb';

import { DeleteManyByQuery } from './deleteManyByQuery';
import { ConvertObjectIDs } from './share/convert';

export const DeleteManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return DeleteManyByQuery(conditions, collectionName);
};
