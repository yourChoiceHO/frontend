import { always, complement, isEmpty, isNil, or, reduce } from "ramda";

export const noop = always<undefined>(void 0);
export const isUnknown = or(isNil, isEmpty);
export const isDefined = complement(isUnknown);
export const getRandomColor = () =>
  `#${(~~(Math.random() * (1 << 24))).toString(16)}`;
export const reduceWithOr = reduce<boolean, boolean>(or, false);
