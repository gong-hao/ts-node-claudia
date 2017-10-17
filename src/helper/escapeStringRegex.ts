export const escapeStringRegex = (input: string): string => {
  const escape = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  return escape;
};
