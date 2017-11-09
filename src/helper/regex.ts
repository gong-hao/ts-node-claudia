const escapeRegex = (input: string): string => {
  const escape = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  return escape
}

export const Regex = {
  escapeRegex
}
