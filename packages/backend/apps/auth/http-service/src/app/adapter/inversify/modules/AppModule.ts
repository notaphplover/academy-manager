import { EnvironmentService } from '@academyjs/backend-auth-env';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { AuthGuard } from '../../../../auth/adapter/inversify/middlewares/AuthGuard';
import { CorsMiddleware } from '../../../cors/adapter/inversify/middlewares/CorsMiddleware';

export class AppModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(AuthGuard).toSelf().inSingletonScope();
      options.bind(CorsMiddleware).toResolvedValue(
        (environmentService: EnvironmentService) =>
          new CorsMiddleware({
            allowHeaders: ['content-type'],
            credentials: true,
            origin: environmentService.getEnvironment().corsOrigins,
          }),
        [EnvironmentService],
      );
    });
  }
}
