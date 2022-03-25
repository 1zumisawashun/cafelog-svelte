import type { firebase } from '../firebase/config';
export type WhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '!='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any'
  | 'not-in';

export type OrderByDirection = 'desc' | 'asc';

export type firebase = firebase;

export type firebasePath = {
  collection: string;
  document: string;
  subCollection: string;
  subDocument: string;
};
