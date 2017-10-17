import 'mocha';

import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import { ConvertObjectID, ConvertObjectIDs } from './convertObjectID';

describe('ConvertObjectID', () => {
  it('should return an ObjectID when using string param', () => {
    const actual = ConvertObjectID('5879e5544cfcc9000130c608');
    expect(actual).instanceof(ObjectID);
  });

  it('should return an ObjectID when using ObjectID param', () => {
    const actual = ConvertObjectID(new ObjectID('5879e5544cfcc9000130c608'));
    expect(actual).instanceof(ObjectID);
  });
});

describe('ConvertObjectIDs', () => {
  it('should return an ObjectID[] when using string[] param', () => {
    const actual = ConvertObjectIDs(['5879e5544cfcc9000130c608', '587b3184d46655000136af90']);
    expect(actual).instanceof(Array);
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID);
    expect(areAllObjectIDs).is.true;
  });

  it('should return an ObjectID[] when using ObjectID[] param', () => {
    const actual = ConvertObjectIDs([new ObjectID('5879e5544cfcc9000130c608'), new ObjectID('5879e5544cfcc9000130c608')]);
    expect(actual).instanceof(Array);
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID);
    expect(areAllObjectIDs).is.true;
  });
});

