import { BetterAuthOptions, Logger } from 'better-auth';
import { DBAdapter } from 'better-auth/adapters';
import {
  admin,
  emailOTP,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';

export interface AppBetterAuthOptions extends BetterAuthOptions {
  database: (options: BetterAuthOptions) => DBAdapter;
  emailAndPassword: {
    enabled: true;
  };
  logger: Logger;
  plugins: [
    ReturnType<typeof admin>,
    ReturnType<typeof emailOTP>,
    ReturnType<typeof organization>,
    ReturnType<typeof openAPI>,
    ReturnType<typeof twoFactor>,
  ];
  trustedOrigins: string[];
}
