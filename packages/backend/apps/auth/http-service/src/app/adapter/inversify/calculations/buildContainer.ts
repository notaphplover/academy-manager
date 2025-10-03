import {
  AppBetterAuthOptions,
  BetterAuthModule,
  betterAuthServiceIdentifier,
} from '@academyjs/auth-better-auth';
import { PrismaModule } from '@academyjs/auth-prisma';
import { MailClientOptions } from '@academyjs/backend-application-mail';
import {
  Environment,
  EnvironmentService,
  EnvModule,
} from '@academyjs/backend-auth-env';
import { MailModule } from '@academyjs/mail-nodemailer';
import { UseGuard } from '@inversifyjs/framework-core';
import {
  BetterAuth,
  BetterAuthHonoContainerModule,
} from '@inversifyjs/http-better-auth';
import { bindingScopeValues, Container, decorate, Newable } from 'inversify';

import { AuthGuard } from '../../../../auth/adapter/inversify/middlewares/AuthGuard';
import { AppModule } from '../modules/AppModule';

export async function buildContainer(): Promise<Container> {
  const container: Container = new Container({
    defaultScope: bindingScopeValues.Singleton,
  });

  await container.load(
    new AppModule(),
    new BetterAuthHonoContainerModule(
      'api/auth',
      (
        betterAuth: BetterAuth<AppBetterAuthOptions>,
      ): BetterAuth<AppBetterAuthOptions> => betterAuth,
      [betterAuthServiceIdentifier],
      (controller: Newable<unknown>): Newable<unknown> => {
        decorate(UseGuard(AuthGuard), controller);

        return controller;
      },
    ),
    new BetterAuthModule(),
    new EnvModule(),
    new MailModule({
      inject: [EnvironmentService],
      useFactory: (
        environmentService: EnvironmentService,
      ): MailClientOptions => {
        const environment: Environment = environmentService.getEnvironment();

        return {
          auth: {
            password: environment.mailConfig.authPassword,
            user: environment.mailConfig.authUser,
          },
          host: environment.mailConfig.host,
          port: environment.mailConfig.port,
          useTls: environment.mailConfig.useTls,
        };
      },
    }),
    new PrismaModule(),
  );

  return container;
}
