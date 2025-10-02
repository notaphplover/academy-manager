import {
  UserFindQuery,
  UserSetQuery,
  UserUpdateQuery,
} from '@academyjs/backend-auth-domain';
import { Builder } from '@academyjs/backend-common';
import { inject, injectable } from 'inversify';

import { Prisma } from '../../../../../generated';
import { PrismaUpdateManyArgsFromUpdateQueryBuilder } from '../../../../foundation/db/adapter/prisma/builders/PrismaUpdateManyArgsFromUpdateQueryBuilder';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from './UserPrismaFindManyArgsFromUserFindQueryBuilder';
import { UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder } from './UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder';

@injectable()
export class UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder
  extends PrismaUpdateManyArgsFromUpdateQueryBuilder<
    UserFindQuery,
    UserSetQuery,
    Prisma.UserUpdateManyAndReturnArgs
  >
  implements Builder<Prisma.UserUpdateManyAndReturnArgs, [UserUpdateQuery]>
{
  constructor(
    @inject(UserPrismaFindManyArgsFromUserFindQueryBuilder)
    userPrismaFindManyArgsFromUserFindQueryBuilder: UserPrismaFindManyArgsFromUserFindQueryBuilder,
    @inject(UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder)
    userPrismaUpdateManyArgsDataFromUserSetQueryBuilder: UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder,
  ) {
    super(
      userPrismaFindManyArgsFromUserFindQueryBuilder,
      userPrismaUpdateManyArgsDataFromUserSetQueryBuilder,
    );
  }
}
