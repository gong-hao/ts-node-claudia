import { ObjectID } from 'mongodb';

export const ConvertObjectID = (id: string | ObjectID): ObjectID => {
  if (id instanceof ObjectID) {
    return id;
  }
  return new ObjectID(id);
};

export const ConvertObjectIDs = (ids: string[] | ObjectID[]): ObjectID[] => {
  const _ids: any[] = ids;
  return _ids.map(id => ConvertObjectID(id));
};
