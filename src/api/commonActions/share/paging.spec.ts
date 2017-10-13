import 'mocha';
import 'should';

import { _getMetadata, _getPageUrl, _getSortObject, GetPaging } from './paging';

describe('_getSortObject', () => {
  it('should return an sort object when using "Views,-CreateOn,+Title"', () => {
    const sort = 'Views,-CreateOn,+Title';
    const defaultObj = { CreateOn: -1 };
    const actual = _getSortObject(sort, defaultObj);
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    };
    actual.should.be.deepEqual(expected);
  });
  it('should return an sort object when using "Views, -CreateOn, +Title"', () => {
    const sort = 'Views, -CreateOn, +Title';
    const defaultObj = { CreateOn: -1 };
    const actual = _getSortObject(sort, defaultObj);
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    };
    actual.should.be.deepEqual(expected);
  });
  it('should return an sort object when using ", Views, -CreateOn, +Title"', () => {
    const sort = ', Views, -CreateOn, +Title';
    const defaultObj = { CreateOn: -1 };
    const actual = _getSortObject(sort, defaultObj);
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    };
    actual.should.be.deepEqual(expected);
  });
  it('should return an default sort object when not passing sort param', () => {
    const sort = null;
    const defaultObj = { CreateOn: -1 };
    const actual = _getSortObject(sort, defaultObj);
    const expected = {
      CreateOn: -1
    };
    actual.should.be.deepEqual(expected);
  });
});

describe('_getPageUrl', () => {
  it('should change to "Page=1" when using params path, 3, 1', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 1);
    actual.should.equal('/todos?Page=1&Limit=2&Sort=Title,-CreateOn');
  });
  it('should change to "Page=1" when using params path, 3, 2', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 2);
    actual.should.equal('/todos?Page=2&Limit=2&Sort=Title,-CreateOn');
  });
  it('should change to null when using params path, 3, 3', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 3);
    should(actual).be.null();
  });
  it('should skip extra ? or &', () => {
    const actual = _getPageUrl('/todos???Page=3&&&Limit=2&Sort=Title,-CreateOn', 3, 2);
    actual.should.equal('/todos?Page=2&Limit=2&Sort=Title,-CreateOn');
  });
});

describe('_getMetadata', () => {
  it('should return correct metadata when using sortObj', () => {
    const count = 13;
    const paging = {
      Page: 1,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    };
    const sortObj = {
      Title: 1,
      CreateOn: -1
    };
    const path = '/todos?Page=1&Limit=2&Sort=Title,-CreateOn'
    const actual = _getMetadata(count, paging, path, sortObj);
    const expected = {
      count: 13,
      page: 1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: null,
        previous: null,
        current: '/todos?Page=1&Limit=2&Sort=Title,-CreateOn',
        next: "/todos?Page=2&Limit=2&Sort=Title,-CreateOn",
        last: "/todos?Page=7&Limit=2&Sort=Title,-CreateOn"
      }
    };
    actual.should.be.deepEqual(expected);
  });
});

describe('GetPaging', () => {
  it('should return correct metadata when using defaultSortObj', () => {
    const count = 13;
    const paging = {
      Page: 1,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    };
    const defaultSortObj = {
      CreateOn: -1
    };
    const path = '/todos?Page=1&Limit=2&Sort=Title,-CreateOn'
    const actual = GetPaging(count, paging, path, defaultSortObj);
    const expected = {
      count: 13,
      page: 1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: null,
        previous: null,
        current: '/todos?Page=1&Limit=2&Sort=Title,-CreateOn',
        next: "/todos?Page=2&Limit=2&Sort=Title,-CreateOn",
        last: "/todos?Page=7&Limit=2&Sort=Title,-CreateOn"
      }
    };
    actual.should.be.deepEqual(expected);
  });
});

