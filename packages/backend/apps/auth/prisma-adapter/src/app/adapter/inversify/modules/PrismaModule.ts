import {
  findManyUsersOutputPortSymbol,
  updateManyUsersOutputPortSymbol,
} from '@academyjs/backend-auth-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { PrismaClient } from '../../../../../generated';
import { FindManyUsersPrismaAdapter } from '../../../../user/adapter/prisma/adapters/FindManyUsersPrismaAdapter';
import { UpdateManyUsersPrismaAdapter } from '../../../../user/adapter/prisma/adapters/UpdateManyUsersPrismaAdapter';
import { UserFromUserPrismaBuilder } from '../../../../user/adapter/prisma/builders/UserFromUserPrismaBuilder';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaFindManyArgsFromUserFindQueryBuilder';
import { UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder';
import { UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder';

export class PrismaModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(PrismaClient)
        .toResolvedValue(() => new PrismaClient())
        .inSingletonScope();
      options.bind(UserFromUserPrismaBuilder).toSelf().inSingletonScope();
      options
        .bind(UserPrismaFindManyArgsFromUserFindQueryBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder)
        .toSelf()
        .inSingletonScope();

      options
        .bind(findManyUsersOutputPortSymbol)
        .to(FindManyUsersPrismaAdapter)
        .inSingletonScope();
      options
        .bind(updateManyUsersOutputPortSymbol)
        .to(UpdateManyUsersPrismaAdapter)
        .inSingletonScope();
    });
  }
}
