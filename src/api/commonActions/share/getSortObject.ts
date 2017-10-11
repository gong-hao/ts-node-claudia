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
