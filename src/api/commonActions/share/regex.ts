export const Escape = (val: string) => {
  return String(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const ISO8601 = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]{3})?(Z)?$/i);

export const LikeReg = (val: string) => {
  return new RegExp(Escape(val), 'i');
};

export const LikeHeadReg = (val: string) => {
  return new RegExp('^' + Escape(val), 'i');
};

export const LikeEndReg = (val: string) => {
  return new RegExp(Escape(val) + '$', 'i');
};

export const EqualReg = (val: string) => {
  return new RegExp('^' + Escape(val) + '$', 'i');
};
