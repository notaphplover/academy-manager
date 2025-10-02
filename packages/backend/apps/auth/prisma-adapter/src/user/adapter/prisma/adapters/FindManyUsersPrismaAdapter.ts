import { FindManyUsersOutputPort } from '@academyjs/backend-auth-application';
import { User, UserFindQuery } from '@academyjs/backend-auth-domain';
import { inject, injectable } from 'inversify';

import {
  Prisma,
  PrismaClient,
  User as PrismaUser,
} from '../../../../../generated';
import * as runtime from '../../../../../generated/runtime/library.js';
import { BaseFindManyPrismaService } from '../../../../foundation/db/adapter/prisma/services/BaseFindPrismaService';
import { UserFromUserPrismaBuilder } from '../builders/UserFromUserPrismaBuilder';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from '../builders/UserPrismaFindManyArgsFromUserFindQueryBuilder';

@injectable()
export class FindManyUsersPrismaAdapter
  extends BaseFindManyPrismaService<
    User,
    UserFindQuery,
    Prisma.UserFindManyArgs,
    PrismaUser
  >
  implements FindManyUsersOutputPort
{
  constructor(
    @inject(PrismaClient)
    client: PrismaClient,
    @inject(UserFromUserPrismaBuilder)
    userFromUserPrismaBuilder: UserFromUserPrismaBuilder,
    @inject(UserPrismaFindManyArgsFromUserFindQueryBuilder)
    userPrismaFindManyArgsFromUserFindQueryBuilder: UserPrismaFindManyArgsFromUserFindQueryBuilder,
  ) {
    super(
      client.user,
      userFromUserPrismaBuilder,
      userPrismaFindManyArgsFromUserFindQueryBuilder,
    );
  }

  protected _getDelegate(
    transactionClient: Omit<PrismaClient, runtime.ITXClientDenyList>,
  ): Prisma.UserDelegate<runtime.DefaultArgs, Prisma.PrismaClientOptions> {
    return transactionClient.user;
  }
}
