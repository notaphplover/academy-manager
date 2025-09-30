import { findManySuperAdminMembershipOutputPortSymbol } from '@academyjs/backend-auth-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder } from '../../../../superAdmin/adapter/prisma/builders/SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder';
import { SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder } from '../../../../superAdmin/adapter/prisma/builders/SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder';
import { SuperAdminMembershipFindPrismaService } from '../../../../superAdmin/adapter/prisma/services/SuperAdminMembershipFindPrismaService';

export class PrismaModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(SuperAdminMembershipFromSuperAdminMembershipPrismaBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(
          SuperAdminMembershipPrismaFindManyArgsFromSuperAdminMembershipFindQueryBuilder,
        )
        .toSelf()
        .inSingletonScope();

      options
        .bind(findManySuperAdminMembershipOutputPortSymbol)
        .to(SuperAdminMembershipFindPrismaService)
        .inSingletonScope();
    });
  }
}
