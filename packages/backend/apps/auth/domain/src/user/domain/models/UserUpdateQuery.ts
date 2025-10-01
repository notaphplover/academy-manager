import { UserFindQuery } from './UserFindQuery';
import { UserSetQuery } from './UserSetQuery';

export interface UserUpdateQuery {
  findQuery: UserFindQuery;
  setQuery: UserSetQuery;
}
