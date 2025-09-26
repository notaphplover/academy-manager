import { Adapter, BetterAuthOptions, Logger } from 'better-auth';
import {
  emailOTP,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';

export interface AppBetterAuthOptions {
  database: (options: BetterAuthOptions) => Adapter;
  emailAndPassword: {
    enabled: true;
  };
  logger: Logger;
  plugins: [
    ReturnType<typeof emailOTP>,
    ReturnType<typeof organization>,
    ReturnType<typeof openAPI>,
    ReturnType<typeof twoFactor>,
  ];
  trustedOrigins: string[];
}
