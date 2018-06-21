import { always, complement, isEmpty, isNil, or } from "ramda";

export const noop = always<undefined>(void 0);
export const isUnknown = or(isNil, isEmpty);
export const isDefined = complement(isUnknown);
