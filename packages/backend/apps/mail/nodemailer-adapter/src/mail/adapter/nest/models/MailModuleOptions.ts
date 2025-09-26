import { MailClientOptions } from '@academyjs/backend-application-mail';
import { ServiceIdentifier } from 'inversify';

export interface MailModuleOptions {
  inject?: ServiceIdentifier[];
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<MailClientOptions> | MailClientOptions;
}
