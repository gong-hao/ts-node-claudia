import 'mocha';

import { expect } from 'chai';

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
    expect(actual).is.deep.equal(expected);
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
    expect(actual).is.deep.equal(expected);
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
    expect(actual).is.deep.equal(expected);
  });
  it('should return an default sort object when not passing sort param', () => {
    const sort = null;
    const defaultObj = { CreateOn: -1 };
    const actual = _getSortObject(sort, defaultObj);
    const expected = {
      CreateOn: -1
    };
    expect(actual).is.deep.equal(expected);
  });
});

describe('_getPageUrl', () => {
  it('should change to "Page=1" when using params path, 3, 1', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 1);
    expect(actual).equal('/todos?Page=1&Limit=2&Sort=Title,-CreateOn');
  });
  it('should change to "Page=1" when using params path, 3, 2', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 2);
    expect(actual).equal('/todos?Page=2&Limit=2&Sort=Title,-CreateOn');
  });
  it('should change to null when using params path, 3, 3', () => {
    const actual = _getPageUrl('/todos?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 3);
    expect(actual).is.null;
  });
  it('should skip extra ? or &', () => {
    const actual = _getPageUrl('/todos???Page=3&&&Limit=2&Sort=Title,-CreateOn', 3, 2);
    expect(actual).equal('/todos?Page=2&Limit=2&Sort=Title,-CreateOn');
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
    expect(actual).is.deep.equal(expected);
  });
  it('should return correct metadata when having divisible pages', () => {
    const count = 10;
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
      count: 10,
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
        last: "/todos?Page=5&Limit=2&Sort=Title,-CreateOn"
      }
    };
    expect(actual).is.deep.equal(expected);
  });
  it('should return correct metadata when last page', () => {
    const count = 13;
    const paging = {
      Page: 7,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    };
    const sortObj = {
      Title: 1,
      CreateOn: -1
    };
    const path = '/todos?Page=7&Limit=2&Sort=Title,-CreateOn'
    const actual = _getMetadata(count, paging, path, sortObj);
    const expected = {
      count: 13,
      page: 7,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: "/todos?Page=1&Limit=2&Sort=Title,-CreateOn",
        previous: "/todos?Page=6&Limit=2&Sort=Title,-CreateOn",
        current: "/todos?Page=7&Limit=2&Sort=Title,-CreateOn",
        next: null,
        last: null
      }
    };
    expect(actual).is.deep.equal(expected);
  });
  it('should return page not exist metadata when page less than 1', () => {
    const count = 13;
    const paging = {
      Page: 0,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    };
    const sortObj = {
      Title: 1,
      CreateOn: -1
    };
    const path = '/todos?Page=0&Limit=2&Sort=Title,-CreateOn'
    const actual = _getMetadata(count, paging, path, sortObj);
    const expected = {
      count: 13,
      page: -1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: null
    };
    expect(actual).is.deep.equal(expected);
  });
  it('should return page not exist metadata when page greater than last', () => {
    const count = 13;
    const paging = {
      Page: 99,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    };
    const sortObj = {
      Title: 1,
      CreateOn: -1
    };
    const path = '/todos?Page=99&Limit=2&Sort=Title,-CreateOn'
    const actual = _getMetadata(count, paging, path, sortObj);
    const expected = {
      count: 13,
      page: -1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: null
    };
    expect(actual).is.deep.equal(expected);
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
    expect(actual).is.deep.equal(expected);
  });
});

