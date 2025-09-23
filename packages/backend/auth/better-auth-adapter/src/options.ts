import { BetterAuthOptions, Logger } from 'better-auth';
import { openAPI, twoFactor } from 'better-auth/plugins';

interface AppBetterAuthOptions {
  emailAndPassword: {
    enabled: true;
  };
  logger: Logger;
  plugins: [ReturnType<typeof openAPI>, ReturnType<typeof twoFactor>];
  trustedOrigins: string[];
}

export const options: AppBetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
  },
  logger: {
    disabled: false,
    level: 'debug',
  },
  plugins: [openAPI(), twoFactor()],
  trustedOrigins: ['*'],
} satisfies BetterAuthOptions;
