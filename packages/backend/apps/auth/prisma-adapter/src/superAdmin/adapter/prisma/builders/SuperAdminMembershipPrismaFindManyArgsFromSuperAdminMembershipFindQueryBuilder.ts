import { SuperAdminMembershipFindQuery } from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { injectable } from 'inversify';

import { Prisma } from '../../../../../generated';

@injectable()
export class SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder
  implements
    Builder<
      Prisma.SuperAdminMembershipFindManyArgs,
      [SuperAdminMembershipFindQuery]
    >
{
  public build(
    superAdminMembershipFindQuery: SuperAdminMembershipFindQuery,
  ): Prisma.SuperAdminMembershipFindManyArgs {
    const findManyArgsWhere: Prisma.SuperAdminMembershipWhereInput = {};
    const findManyArgs: Prisma.SuperAdminMembershipFindManyArgs = {
      where: findManyArgsWhere,
    };

    if (
      superAdminMembershipFindQuery.userId !== undefined &&
      superAdminMembershipFindQuery.userId.length > 0
    ) {
      findManyArgsWhere.userId = { in: superAdminMembershipFindQuery.userId };
    }

    return findManyArgs;
  }
}
