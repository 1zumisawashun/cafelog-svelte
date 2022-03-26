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

export type firebasePath = {
  collection: string;
  document: string;
  subCollection: string;
  subDocument: string;
};
