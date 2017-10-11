export const Escape = val => {
  let result = String(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  return result;
};

export const ISO8601 = val => {
  // ex: 2016-12-25T08:00:00.000Z
  return new RegExp(/\d{4}-\d{2}-\d{2}[T|t]\d{2}:\d{2}:\d{2}.\d{3}[Z|z]/i).test(val);
};

export const LikeReg = val => {
  return new RegExp(Escape(val), 'i');
};

export const LikeHeadReg = val => {
  return new RegExp('^' + Escape(val), 'i');
};

export const LikeEndReg = val => {
  return new RegExp(Escape(val) + '$', 'i');
};

export const EqualReg = val => {
  return new RegExp('^' + Escape(val) + '$', 'i');
};
