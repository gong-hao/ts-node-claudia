const _getEscapeString = (input: string): string => {
  const escape = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  return escape
}

const escapeRegex = (input: string): RegExp => {
  const escape = _getEscapeString(input)
  return new RegExp(escape)
}

export const RegexHelper = {
  _getEscapeString,
  escapeRegex
}
