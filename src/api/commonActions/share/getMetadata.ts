import { GetPageUrl } from './getPageUrl';

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
