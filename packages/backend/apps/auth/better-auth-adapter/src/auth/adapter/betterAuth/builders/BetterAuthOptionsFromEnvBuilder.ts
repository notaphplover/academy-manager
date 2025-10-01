import { PrismaClient } from '@academyjs/auth-prisma';
import {
  MailDeliveryOutputPort,
  mailDeliveryOutputPortSymbol,
} from '@academyjs/backend-application-mail';
import { Builder } from '@academyjs/backend-common';
import { BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin,
  emailOTP,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';
import { inject, injectable } from 'inversify';

import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from '../../../../mail/applcation/builders/MailDeliveryOptionsFromSendOtpMailOptionsBuilder';
import { AppBetterAuthOptions } from '../models/AppBetterAuthOptions';

@injectable()
export class BetterAuthOptionsFromEnvBuilder
  implements Builder<AppBetterAuthOptions>
{
  readonly #mailDeliveryOutputPort: MailDeliveryOutputPort;
  readonly #mailDeliveryOptionsFromSendOtpMailOptionsBuilder: MailDeliveryOptionsFromSendOtpMailOptionsBuilder;

  constructor(
    @inject(mailDeliveryOutputPortSymbol)
    mailDeliveryOutputPort: MailDeliveryOutputPort,
    @inject(MailDeliveryOptionsFromSendOtpMailOptionsBuilder)
    mailDeliveryOptionsFromSendOtpMailOptionsBuilder: MailDeliveryOptionsFromSendOtpMailOptionsBuilder,
  ) {
    this.#mailDeliveryOutputPort = mailDeliveryOutputPort;
    this.#mailDeliveryOptionsFromSendOtpMailOptionsBuilder =
      mailDeliveryOptionsFromSendOtpMailOptionsBuilder;
  }

  public build(): AppBetterAuthOptions {
    const options: AppBetterAuthOptions = {
      database: prismaAdapter(new PrismaClient(), {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      logger: {
        disabled: false,
        level: 'debug',
      },
      plugins: [
        admin(),
        emailOTP({
          sendVerificationOTP: async ({
            email,
            otp,
            type,
          }: {
            email: string;
            otp: string;
            type: 'sign-in' | 'email-verification' | 'forget-password';
          }): Promise<void> => {
            await this.#mailDeliveryOutputPort.send(
              this.#mailDeliveryOptionsFromSendOtpMailOptionsBuilder.build({
                email,
                otp,
                type,
              }),
            );
          },
        }),
        organization(),
        openAPI(),
        twoFactor(),
      ],
      trustedOrigins: ['*'],
    } satisfies BetterAuthOptions;

    return options;
  }
}
