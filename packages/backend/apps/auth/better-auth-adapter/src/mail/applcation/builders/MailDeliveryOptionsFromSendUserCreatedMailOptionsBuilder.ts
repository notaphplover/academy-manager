import { MailDeliveryOptions } from '@academyjs/backend-application-mail';
import { Environment, EnvironmentService } from '@academyjs/backend-auth-env';
import { Builder } from '@academyjs/backend-common';
import { inject, injectable } from 'inversify';

import { SendUserCreatedMailOptions } from '../models/SendUserCreatedMailOptions';

const USER_ACTIVATION_SUBJECT: string = 'Reset password request';

@injectable()
export class MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder
  implements Builder<MailDeliveryOptions, [SendUserCreatedMailOptions]>
{
  readonly #sourceMailAddress: string;

  constructor(
    @inject(EnvironmentService)
    environmentService: EnvironmentService,
  ) {
    const environment: Environment = environmentService.getEnvironment();

    this.#sourceMailAddress = environment.mailConfig.defaultAddress;
  }

  public build(options: SendUserCreatedMailOptions): MailDeliveryOptions {
    return {
      from: this.#sourceMailAddress,
      html: this.#buildHtmlMessage(options),
      subject: USER_ACTIVATION_SUBJECT,
      to: [options.email],
    };
  }

  #buildHtmlMessage(options: SendUserCreatedMailOptions): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=">
    <title>${USER_ACTIVATION_SUBJECT}</title>
  </head>
  <body style="font-size: 16px; font-weight: 400; letter-spacing: 0em; margin: 0; padding-bottom: 40px; padding-right: 40px; text-align: left;">
    <table style="border:0;width:100%">
      <tbody>
        <tr>
          <td style="padding-bottom: 6px; padding-top: 38px;">
            Dear user,
            <br>
            A new account has been created for you. The initial password for your account is ${options.password}. Please change it after your first sign-in.
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
  }
}
