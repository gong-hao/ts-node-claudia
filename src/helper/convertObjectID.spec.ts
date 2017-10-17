import 'mocha';

import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import { convertObjectID, convertObjectIDs } from './convertObjectID';

describe('ConvertObjectID', () => {
  it('should return an ObjectID when using string param', () => {
    const actual = convertObjectID('5879e5544cfcc9000130c608');
    expect(actual).instanceof(ObjectID);
  });

  it('should return an ObjectID when using ObjectID param', () => {
    const actual = convertObjectID(new ObjectID('5879e5544cfcc9000130c608'));
    expect(actual).instanceof(ObjectID);
  });
});

describe('ConvertObjectIDs', () => {
  it('should return an ObjectID[] when using string[] param', () => {
    const actual = convertObjectIDs(['5879e5544cfcc9000130c608', '587b3184d46655000136af90']);
    expect(actual).instanceof(Array);
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID);
    expect(areAllObjectIDs).is.true;
  });

  it('should return an ObjectID[] when using ObjectID[] param', () => {
    const actual = convertObjectIDs([new ObjectID('5879e5544cfcc9000130c608'), new ObjectID('5879e5544cfcc9000130c608')]);
    expect(actual).instanceof(Array);
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID);
    expect(areAllObjectIDs).is.true;
  });
});

