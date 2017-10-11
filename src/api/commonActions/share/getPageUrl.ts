export const GetPageUrl = (path, currentPage, newPage) => {
  if (currentPage === newPage) {
    return null;
  }
  return path
    .split(/[?&]/)
    .map((x, i) => {
      const prefix = i === 0 ? '' : '&';
      const suffix = i === 0 ? '?' : '';
      if (x === 'Page=' + currentPage) {
        return prefix + 'Page=' + newPage + suffix;
      }
      return prefix + x + suffix;
    })
    .join('');
};
