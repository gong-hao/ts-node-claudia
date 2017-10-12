export const GetSortObject = (sort, defaultObj) => {
  if (!sort) {
    return defaultObj;
  }
  const obj = {};
  sort.split(',').forEach(x => {
    const isDesc = x.indexOf('-') === 0;
    const name = x.replace(/[^0-9a-zA-Z]/, '');
    if (isDesc) {
      obj[name] = -1;
    } else {
      obj[name] = 1;
    }
  });
  return obj;
};

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

export const GetMetadata = (count, paging, url) => {
  const first = 1;
  const last = Math.floor(count / paging.Limit) + (count % paging.Limit > 0 ? 1 : 0);
  const previous = paging.Page === 1 ? 1 : paging.Page - 1;
  const next = paging.Page === last ? last : paging.Page + 1;
  const pageExist = paging.Page > 0 && paging.Page <= last;
  const metadata = {
    count: count,
    page: pageExist ? paging.Page : -1,
    limit: paging.Limit,
    sort: paging.Sort,
    links: pageExist ? {
      first: GetPageUrl(url, paging.Page, first),
      previous: GetPageUrl(url, paging.Page, previous),
      current: url,
      next: GetPageUrl(url, paging.Page, next),
      last: GetPageUrl(url, paging.Page, last)
    } : null
  };
  return metadata;
};
