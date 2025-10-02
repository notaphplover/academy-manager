import { UpdateManyUsersOutputPort } from '@academyjs/backend-auth-application';
import { User, UserUpdateQuery } from '@academyjs/backend-auth-domain';
import { inject, injectable } from 'inversify';

import {
  Prisma,
  PrismaClient,
  User as PrismaUser,
} from '../../../../../generated';
import * as runtime from '../../../../../generated/runtime/library.js';
import { BaseUpdatePrismaService } from '../../../../foundation/db/adapter/prisma/services/BaseUpdatePrismaService';
import { UserFromUserPrismaBuilder } from '../builders/UserFromUserPrismaBuilder';
import { UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder } from '../builders/UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder';

@injectable()
export class UpdateManyUsersPrismaAdapter
  extends BaseUpdatePrismaService<
    User,
    UserUpdateQuery,
    Prisma.UserUpdateManyArgs,
    PrismaUser
  >
  implements UpdateManyUsersOutputPort
{
  constructor(
    @inject(PrismaClient)
    client: PrismaClient,
    @inject(UserFromUserPrismaBuilder)
    userFromUserPrismaBuilder: UserFromUserPrismaBuilder,
    @inject(UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder)
    userPrismaUpdateManyArgsFromUserUpdateQueryBuilder: UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder,
  ) {
    super(
      client.user,
      userFromUserPrismaBuilder,
      userPrismaUpdateManyArgsFromUserUpdateQueryBuilder,
    );
  }

  protected _getDelegate(
    transactionClient: Omit<PrismaClient, runtime.ITXClientDenyList>,
  ): Prisma.UserDelegate<runtime.DefaultArgs, Prisma.PrismaClientOptions> {
    return transactionClient.user;
  }
}
