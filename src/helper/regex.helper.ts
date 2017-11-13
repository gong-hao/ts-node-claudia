const _getEscapedString = (input: string): string => {
  const escape = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  return escape
}

const escape = (input: string): RegExp => {
  const escapedString = _getEscapedString(input)
  return new RegExp(escapedString)
}

export const RegexHelper = {
  _getEscapedString,
  escape
}
