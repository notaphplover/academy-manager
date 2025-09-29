import crypto from 'node:crypto';

import {
  MailDeliveryOutputPort,
  mailDeliveryOutputPortSymbol,
} from '@academyjs/backend-application-mail';
import {
  PopulateUsersOutputPort,
  PopulateUsersOutputPortUser,
} from '@academyjs/backend-auth-application';
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
    this.#mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder =
      mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder;
    this.#mailDeliveryOutputPort = mailDeliveryOutputPort;
  }

  public async populateUsers(
    users: PopulateUsersOutputPortUser[],
  ): Promise<void> {
    await Promise.all(
      users.map(async (user: PopulateUsersOutputPortUser) => {
        const password: string = this.#generatePassword();

        await this.#betterAuth.api.signUpEmail({
          body: {
            email: user.email,
            name: user.name,
            password,
          },
        });

        await this.#mailDeliveryOutputPort.send(
          this.#mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.build({
            email: user.email,
            name: user.name,
            password,
          }),
        );
      }),
    );
  }

  #generatePassword(): string {
    return Array.from(crypto.getRandomValues(new Uint32Array(PASSWORD_LENGTH)))
      .map((x: number) => PASSWORD_CHARACTERS[x % PASSWORD_CHARACTERS.length])
      .join('');
  }
}
