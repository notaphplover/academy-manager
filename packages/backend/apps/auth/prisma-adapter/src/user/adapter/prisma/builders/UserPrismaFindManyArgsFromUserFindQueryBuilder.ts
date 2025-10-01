import { UserFindQuery } from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { injectable } from 'inversify';

import { Prisma } from '../../../../../generated';

@injectable()
export class UserPrismaFindManyArgsFromUserFindQueryBuilder
  implements Builder<Prisma.UserFindManyArgs, [UserFindQuery]>
{
  public build(userFindQuery: UserFindQuery): Prisma.UserFindManyArgs {
    const findManyArgsWhere: Prisma.UserWhereInput = {};
    const findManyArgs: Prisma.UserFindManyArgs = {
      where: findManyArgsWhere,
    };

    if (userFindQuery.id !== undefined && userFindQuery.id.length > 0) {
      findManyArgsWhere.id = { in: userFindQuery.id };
    }

    return findManyArgs;
  }
}
