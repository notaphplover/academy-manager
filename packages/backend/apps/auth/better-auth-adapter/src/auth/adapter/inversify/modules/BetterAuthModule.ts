import { betterAuth } from 'better-auth';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from '../../../../mail/applcation/builders/MailDeliveryOptionsFromSendOtpMailOptionsBuilder';
import { BetterAuthOptionsFromEnvBuilder } from '../../betterAuth/builders/BetterAuthOptionsFromEnvBuilder';
import { AppBetterAuthOptions } from '../../betterAuth/models/AppBetterAuthOptions';
import { BetterAuth } from '../../betterAuth/models/BetterAuth';
import { betterAuthServiceIdentifier } from '../models/betterAuthServiceIdentifier';

export class BetterAuthModule extends ContainerModule {
  constructor() {
    super((containerModuleLoadOptions: ContainerModuleLoadOptions) => {
      containerModuleLoadOptions
        .bind(MailDeliveryOptionsFromSendOtpMailOptionsBuilder)
        .toSelf()
        .inSingletonScope();

      containerModuleLoadOptions
        .bind(BetterAuthOptionsFromEnvBuilder)
        .toSelf()
        .inSingletonScope();

      containerModuleLoadOptions
        .bind(betterAuthServiceIdentifier)
        .toResolvedValue(
          (
            betterAuthOptionsFromEnvBuilder: BetterAuthOptionsFromEnvBuilder,
          ): BetterAuth<AppBetterAuthOptions> =>
            betterAuth(betterAuthOptionsFromEnvBuilder.build()),
          [BetterAuthOptionsFromEnvBuilder],
        );
    });
  }
}
