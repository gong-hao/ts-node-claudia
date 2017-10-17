import { ObjectID } from 'mongodb';

export const convertObjectID = (id: string | ObjectID): ObjectID => {
  if (id instanceof ObjectID) {
    return id;
  }
  return new ObjectID(id);
};

export const convertObjectIDs = (ids: string[] | ObjectID[]): ObjectID[] => {
  const _ids: any[] = ids;
  return _ids.map(id => convertObjectID(id));
};
