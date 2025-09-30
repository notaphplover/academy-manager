import { FindManySuperAdminMembershipOutputPort } from '@academyjs/backend-auth-application';
import {
  SuperAdminMembership,
  SuperAdminMembershipFindQuery,
} from '@academyjs/backend-auth-domain';
import { inject, injectable } from 'inversify';

import {
  Prisma,
  PrismaClient,
  SuperAdminMembership as PrismaSuperAdminMembership,
} from '../../../../../generated';
import * as runtime from '../../../../../generated/runtime/library.js';
import { BaseFindManyPrismaService } from '../../../../foundation/db/adapter/BaseFindPrismaService';
import { SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder } from '../builders/SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder';
import { SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder } from '../builders/SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder';

@injectable()
export class SuperAdminMembershipFindPrismaService
  extends BaseFindManyPrismaService<
    SuperAdminMembership,
    SuperAdminMembershipFindQuery,
    Prisma.SuperAdminMembershipFindManyArgs,
    PrismaSuperAdminMembership
  >
  implements FindManySuperAdminMembershipOutputPort
{
  constructor(
    @inject(PrismaClient)
    client: PrismaClient,
    @inject(SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder)
    superAdminMembershipFromSuperAdminMembershipPrismaBuilder: SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder,
    @inject(
      SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder,
    )
    superAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder: SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder,
  ) {
    super(
      client.superAdminMembership,
      superAdminMembershipFromSuperAdminMembershipPrismaBuilder,
      superAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder,
    );
  }

  protected _getDelegate(
    transactionClient: Omit<PrismaClient, runtime.ITXClientDenyList>,
  ): Prisma.SuperAdminMembershipDelegate<
    runtime.DefaultArgs,
    Prisma.PrismaClientOptions
  > {
    return transactionClient.superAdminMembership;
  }
}
