import {
  AppBetterAuthOptions,
  BetterAuthModule,
  betterAuthServiceIdentifier,
} from '@academyjs/auth-better-auth';
import { MailClientOptions } from '@academyjs/backend-application-mail';
import { AuthModule as AppAuthModule } from '@academyjs/backend-auth-application';
import {
  Environment,
  EnvironmentService,
  EnvModule,
} from '@academyjs/backend-auth-env';
import { MailModule } from '@academyjs/mail-nodemailer';
import {
  BetterAuth,
  BetterAuthHonoContainerModule,
} from '@inversifyjs/http-better-auth';
import { bindingScopeValues, Container } from 'inversify';

export async function buildContainer(): Promise<Container> {
  const container: Container = new Container({
    defaultScope: bindingScopeValues.Singleton,
  });

  await container.load(
    new AppAuthModule(),
    new BetterAuthHonoContainerModule(
      'api/auth',
      (
        betterAuth: BetterAuth<AppBetterAuthOptions>,
      ): BetterAuth<AppBetterAuthOptions> => betterAuth,
      [betterAuthServiceIdentifier],
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
  );

  return container;
}
