import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { SeedSuperAdminUsersInputPort } from '../../../../auth/application/ports/input/SeedSuperAdminUsersInputPort';

export class AuthModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions): void => {
      options.bind(SeedSuperAdminUsersInputPort).toSelf().inSingletonScope();
    });
  }
}
