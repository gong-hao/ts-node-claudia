import { ObjectID } from 'mongodb';

import { FindOneByQuery } from './findOneByQuery';
import { ConvertObjectID } from './share/convert';

export const FindOneById = async<T>(id: string | ObjectID, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return FindOneByQuery<T>(conditions, collectionName);
};
