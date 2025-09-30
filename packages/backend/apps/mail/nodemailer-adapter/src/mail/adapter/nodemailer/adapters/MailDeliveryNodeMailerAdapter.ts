import {
  MailDeliveryOptions,
  MailDeliveryOutputPort,
} from '@academyjs/backend-application-mail';
import { retry, RetryOptionsStrategyKind } from '@academyjs/backend-common';
import { inject, injectable } from 'inversify';
import nodemailer from 'nodemailer';

import { transporterSymbol } from '../models/transporterSymbol';

@injectable()
export class MailDeliveryNodeMailerAdapter implements MailDeliveryOutputPort {
  readonly #transporter: nodemailer.Transporter<nodemailer.SentMessageInfo>;

  constructor(
    @inject(transporterSymbol)
    transporter: nodemailer.Transporter<nodemailer.SentMessageInfo>,
  ) {
    this.#transporter = transporter;
  }

  public async send(deliveryOptions: MailDeliveryOptions): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions =
      this.#buildMailOptions(deliveryOptions);

    await retry({
      operation: async () => {
        await this.#transporter.sendMail(mailOptions);
      },
      strategy: {
        factor: 2,
        initialDelayMs: 1000,
        kind: RetryOptionsStrategyKind.exponential,
        maxAttempts: 5,
      },
    });
  }

  #buildMailOptions(
    deliveryOptions: MailDeliveryOptions,
  ): nodemailer.SendMailOptions {
    return {
      from: deliveryOptions.from,
      html: deliveryOptions.html,
      subject: deliveryOptions.subject,
      text: deliveryOptions.text,
      to: deliveryOptions.to,
    };
  }
}
