import { MailDeliveryOptions } from '@academyjs/backend-application-mail';
import { Environment, EnvironmentService } from '@academyjs/backend-auth-env';
import { Builder } from '@academyjs/backend-common';
import { inject, injectable } from 'inversify';

import { SendOtpMailOptions } from '../models/SendOtpMailOptions';

const USER_ACTIVATION_SUBJECT: string = 'Reset password request';

@injectable()
export class MailDeliveryOptionsFromSendOtpMailOptionsBuilder
  implements Builder<MailDeliveryOptions, [SendOtpMailOptions]>
{
  readonly #sourceMailAddress: string;

  constructor(
    @inject(EnvironmentService)
    environmentService: EnvironmentService,
  ) {
    const environment: Environment = environmentService.getEnvironment();

    this.#sourceMailAddress = environment.mailConfig.defaultAddress;
  }

  public build(options: SendOtpMailOptions): MailDeliveryOptions {
    return {
      from: this.#sourceMailAddress,
      html: this.#buildHtmlMessage(options),
      subject: USER_ACTIVATION_SUBJECT,
      to: [options.email],
    };
  }

  #buildHtmlMessage(options: SendOtpMailOptions): string {
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
            ${this.#buildRequestInfoText(options)}. The OTP to complete your request is ${options.otp}.
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
  }

  #buildRequestInfoText(options: SendOtpMailOptions): string {
    switch (options.type) {
      case 'sign-in':
        return 'A sign-in request has been received.';
      case 'email-verification':
        return 'An email verification has been requested.';
      case 'forget-password':
        return 'A password reset has been requested.';
    }
  }
}
