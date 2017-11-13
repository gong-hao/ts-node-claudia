import 'mocha'

import { expect } from 'chai'

import { RegexHelper } from './regex.helper'

describe('test RegexHelper._getEscapeString', () => {
  it('should return an escaped regex string', () => {
    const actual = RegexHelper._getEscapeString(`a!b-c[d]e\\f/g*h$i^j.k?l{m}n+o|p`)
    const expected = `a!b\\-c\\[d\\]e\\\\f\\/g\\*h\\$i\\^j\\.k\\?l\\{m\\}n\\+o\\|p`
    expect(actual).equals(expected)
  })

  it('should return an escaped regex', () => {
    const actual = RegexHelper.escapeRegex(`a!b-c[d]e\\f/g*h$i^j.k?l{m}n+o|p`)
    const expected = new RegExp(`a!b\\-c\\[d\\]e\\\\f\\/g\\*h\\$i\\^j\\.k\\?l\\{m\\}n\\+o\\|p`)
    expect(actual).deep.equals(expected)
  })
})
