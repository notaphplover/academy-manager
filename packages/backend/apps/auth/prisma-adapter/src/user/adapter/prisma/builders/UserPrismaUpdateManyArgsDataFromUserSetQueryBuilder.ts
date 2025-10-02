import { UserSetQuery } from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { injectable } from 'inversify';

import { UserPrismaUpdateManyArgsData } from '../models/UserPrismaUpdateManyArgsData';

@injectable()
export class UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder
  implements Builder<UserPrismaUpdateManyArgsData, [UserSetQuery]>
{
  public build(userSetQuery: UserSetQuery): UserPrismaUpdateManyArgsData {
    const data: UserPrismaUpdateManyArgsData = {};

    if (userSetQuery.role !== undefined) {
      data.role = userSetQuery.role;
    }

    return data;
  }
}
