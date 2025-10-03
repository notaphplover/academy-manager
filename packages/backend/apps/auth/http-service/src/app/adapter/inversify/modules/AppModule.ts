import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { AuthGuard } from '../../../../auth/adapter/inversify/middlewares/AuthGuard';

export class AppModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(AuthGuard).toSelf().inSingletonScope();
    });
  }
}
