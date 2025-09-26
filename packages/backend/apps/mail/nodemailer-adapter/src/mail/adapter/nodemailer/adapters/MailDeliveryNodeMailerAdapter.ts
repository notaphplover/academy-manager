import {
  MailDeliveryOptions,
  MailDeliveryOutputPort,
} from '@academyjs/backend-application-mail';
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

    await this.#transporter.sendMail(mailOptions);
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
