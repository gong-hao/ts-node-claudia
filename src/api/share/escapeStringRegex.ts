export const EscapeStringRegex = (input: string): string => {
  const escape = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  return escape;
};
