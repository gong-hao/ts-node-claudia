import 'mocha'

import { expect } from 'chai'

import { PagingHelper } from './paging.helper'

describe('test PagingHelper._getSortObject', () => {
  it('should return an sort object when using "Views,-CreateOn,+Title"', () => {
    const sort = 'Views,-CreateOn,+Title'
    const defaultObj = { CreateOn: -1 }
    const actual = PagingHelper._getSortObject(sort, defaultObj)
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    }
    expect(actual).deep.equals(expected)
  })

  it('should return an sort object when using "Views, -CreateOn, +Title"', () => {
    const sort = 'Views, -CreateOn, +Title'
    const defaultObj = { CreateOn: -1 }
    const actual = PagingHelper._getSortObject(sort, defaultObj)
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    }
    expect(actual).deep.equals(expected)
  })

  it('should return an sort object when using ", Views, -CreateOn, +Title"', () => {
    const sort = ', Views, -CreateOn, +Title'
    const defaultObj = { CreateOn: -1 }
    const actual = PagingHelper._getSortObject(sort, defaultObj)
    const expected = {
      Views: 1,
      CreateOn: -1,
      Title: 1
    }
    expect(actual).deep.equals(expected)
  })

  it('should return an default sort object when not passing sort param', () => {
    const sort = null
    const defaultObj = { CreateOn: -1 }
    const actual = PagingHelper._getSortObject(sort, defaultObj)
    const expected = {
      CreateOn: -1
    }
    expect(actual).deep.equals(expected)
  })
})

describe('test PagingHelper._getPageUrl', () => {
  it('should change the url to "Page=1" if it is the first page', () => {
    const actual = PagingHelper._getPageUrl('/todo?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 1)
    expect(actual).equals('/todo?Page=1&Limit=2&Sort=Title,-CreateOn')
  })

  it('should change the url to "Page=2" if it is the previous page', () => {
    const actual = PagingHelper._getPageUrl('/todo?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 2)
    expect(actual).equals('/todo?Page=2&Limit=2&Sort=Title,-CreateOn')
  })

  it('should change the url to null if it is the current page', () => {
    const actual = PagingHelper._getPageUrl('/todo?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 3)
    expect(actual).is.null
  })

  it('should change the url to "Page=4" if it is the next page', () => {
    const actual = PagingHelper._getPageUrl('/todo?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 4)
    expect(actual).equals('/todo?Page=4&Limit=2&Sort=Title,-CreateOn')
  })

  it('should change the url to "Page=5" if it is the last page', () => {
    const actual = PagingHelper._getPageUrl('/todo?Page=3&Limit=2&Sort=Title,-CreateOn', 3, 5)
    expect(actual).equals('/todo?Page=5&Limit=2&Sort=Title,-CreateOn')
  })

  it('should skip extra ? or &', () => {
    const actual = PagingHelper._getPageUrl('/todo???Page=3&&&Limit=2&Sort=Title,-CreateOn', 3, 2)
    expect(actual).equals('/todo?Page=2&Limit=2&Sort=Title,-CreateOn')
  })
})

describe('test PagingHelper._getMetadata', () => {
  it('should return correct metadata when using sortObj', () => {
    const count = 13
    const paging = {
      Page: 1,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const sortObj = {
      Title: 1,
      CreateOn: -1
    }
    const path = '/todo?Page=1&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper._getMetadata(count, paging, path, sortObj)
    const expected = {
      count: 13,
      page: 1,
      last: 7,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: null,
        previous: null,
        current: '/todo?Page=1&Limit=2&Sort=Title,-CreateOn',
        next: "/todo?Page=2&Limit=2&Sort=Title,-CreateOn",
        last: "/todo?Page=7&Limit=2&Sort=Title,-CreateOn"
      }
    }
    expect(actual).deep.equals(expected)
  })

  it('should return correct metadata if the page count is divisible', () => {
    const count = 10
    const paging = {
      Page: 1,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const sortObj = {
      Title: 1,
      CreateOn: -1
    }
    const path = '/todo?Page=1&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper._getMetadata(count, paging, path, sortObj)
    const expected = {
      count: 10,
      page: 1,
      last: 5,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: null,
        previous: null,
        current: '/todo?Page=1&Limit=2&Sort=Title,-CreateOn',
        next: "/todo?Page=2&Limit=2&Sort=Title,-CreateOn",
        last: "/todo?Page=5&Limit=2&Sort=Title,-CreateOn"
      }
    }
    expect(actual).deep.equals(expected)
  })

  it('should return correct metadata if it is the last page', () => {
    const count = 13
    const paging = {
      Page: 7,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const sortObj = {
      Title: 1,
      CreateOn: -1
    }
    const path = '/todo?Page=7&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper._getMetadata(count, paging, path, sortObj)
    const expected = {
      count: 13,
      page: 7,
      last: 7,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: "/todo?Page=1&Limit=2&Sort=Title,-CreateOn",
        previous: "/todo?Page=6&Limit=2&Sort=Title,-CreateOn",
        current: "/todo?Page=7&Limit=2&Sort=Title,-CreateOn",
        next: null,
        last: null
      }
    }
    expect(actual).deep.equals(expected)
  })

  it('should return page not exist metadata if page less than 1', () => {
    const count = 13
    const paging = {
      Page: 0,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const sortObj = {
      Title: 1,
      CreateOn: -1
    }
    const path = '/todo?Page=0&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper._getMetadata(count, paging, path, sortObj)
    const expected = {
      count: 13,
      page: -1,
      last: -1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: null
    }
    expect(actual).deep.equals(expected)
  })

  it('should return page not exist metadata if page greater than last', () => {
    const count = 13
    const paging = {
      Page: 99,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const sortObj = {
      Title: 1,
      CreateOn: -1
    }
    const path = '/todo?Page=99&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper._getMetadata(count, paging, path, sortObj)
    const expected = {
      count: 13,
      page: -1,
      last: -1,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: null
    }
    expect(actual).deep.equals(expected)
  })
})

describe('test PagingHelper.getPagingHelper', () => {
  it('should return correct metadata when using defaultSortObj', () => {
    const count = 13
    const paging = {
      Page: 1,
      Limit: 2,
      Sort: 'Title,-CreateOn'
    }
    const defaultSortObj = {
      CreateOn: -1
    }
    const path = '/todo?Page=1&Limit=2&Sort=Title,-CreateOn'
    const actual = PagingHelper.getPaging(count, paging, path, defaultSortObj)
    const expected = {
      count: 13,
      page: 1,
      last: 7,
      limit: 2,
      sort: {
        Title: 1,
        CreateOn: -1
      },
      links: {
        first: null,
        previous: null,
        current: '/todo?Page=1&Limit=2&Sort=Title,-CreateOn',
        next: "/todo?Page=2&Limit=2&Sort=Title,-CreateOn",
        last: "/todo?Page=7&Limit=2&Sort=Title,-CreateOn"
      }
    }
    expect(actual).deep.equals(expected)
  })
})
