import crypto from 'node:crypto';

import {
  MailDeliveryOutputPort,
  mailDeliveryOutputPortSymbol,
} from '@academyjs/backend-application-mail';
import {
  PopulateUsersOutputPort,
  PopulateUsersOutputPortUser,
} from '@academyjs/backend-auth-application';
import { ConsoleLogger, Logger } from '@inversifyjs/logger';
import { inject, injectable } from 'inversify';

import { MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder } from '../../../../mail/applcation/builders/MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder';
import { betterAuthServiceIdentifier } from '../../inversify/models/betterAuthServiceIdentifier';
import { AppBetterAuthOptions } from '../models/AppBetterAuthOptions';
import { BetterAuth } from '../models/BetterAuth';

const PASSWORD_LENGTH: number = 32;
const PASSWORD_CHARACTERS: string =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~¡!@-#$%&()=+{}[]<>?';

@injectable()
export class PopulateUsersBetterAuthAdapter implements PopulateUsersOutputPort {
  readonly #betterAuth: BetterAuth<AppBetterAuthOptions>;
  readonly #logger: Logger;
  readonly #mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder: MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder;
  readonly #mailDeliveryOutputPort: MailDeliveryOutputPort;

  constructor(
    @inject(betterAuthServiceIdentifier)
    betterAuth: BetterAuth<AppBetterAuthOptions>,
    @inject(MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder)
    mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder: MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder,
    @inject(mailDeliveryOutputPortSymbol)
    mailDeliveryOutputPort: MailDeliveryOutputPort,
  ) {
    this.#betterAuth = betterAuth;
    this.#logger = new ConsoleLogger('PopulateUsersBetterAuthAdapter');
    this.#mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder =
      mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder;
    this.#mailDeliveryOutputPort = mailDeliveryOutputPort;
  }

  public async populateUsers(
    users: PopulateUsersOutputPortUser[],
  ): Promise<void> {
    await Promise.all(
      users.map(async (user: PopulateUsersOutputPortUser) => {
        try {
          const password: string = this.#generatePassword();

          await this.#betterAuth.api.signUpEmail({
            body: {
              email: user.email,
              name: user.name,
              password,
            },
          });

          await this.#mailDeliveryOutputPort.send(
            this.#mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.build(
              {
                email: user.email,
                name: user.name,
                password,
              },
            ),
          );
        } catch (error: unknown) {
          this.#logger.warn(
            `Skipping user population for "${user.email}". An error occurred: \n\n${JSON.stringify(error, Object.getOwnPropertyNames(error))}`,
          );
        }
      }),
    );
  }

  #generatePassword(): string {
    return Array.from(crypto.getRandomValues(new Uint32Array(PASSWORD_LENGTH)))
      .map((x: number) => PASSWORD_CHARACTERS[x % PASSWORD_CHARACTERS.length])
      .join('');
  }
}
