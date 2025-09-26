import {
  MailClientOptions,
  mailDeliveryOutputPortSymbol,
} from '@academyjs/backend-application-mail';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import nodemailer from 'nodemailer';

import { MailDeliveryNodeMailerAdapter } from '../../nodemailer/adapters/MailDeliveryNodeMailerAdapter';
import { mailClientOptionsSymbol } from '../../nodemailer/models/mailClientOptionsSymbol';
import { transporterSymbol } from '../../nodemailer/models/transporterSymbol';
import { MailModuleOptions } from '../models/MailModuleOptions';

export class MailModule extends ContainerModule {
  constructor(options: MailModuleOptions) {
    super((containerModuleOptions: ContainerModuleLoadOptions): void => {
      containerModuleOptions
        .bind(mailClientOptionsSymbol)
        .toResolvedValue(options.useFactory, options.inject ?? [])
        .inSingletonScope();

      containerModuleOptions
        .bind(mailDeliveryOutputPortSymbol)
        .to(MailDeliveryNodeMailerAdapter)
        .inSingletonScope();

      containerModuleOptions.bind(transporterSymbol).toResolvedValue(
        (
          options: MailClientOptions,
        ): nodemailer.Transporter<nodemailer.SentMessageInfo> =>
          nodemailer.createTransport({
            auth: {
              pass: options.auth.password,
              user: options.auth.user,
            },
            host: options.host,
            port: options.port,
            secure: options.useTls,
          }),
        [mailClientOptionsSymbol],
      );
    });
  }
}
