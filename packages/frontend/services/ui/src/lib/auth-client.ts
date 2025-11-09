import type { BetterAuthClientPlugin } from 'better-auth';
import {
  adminClient,
  emailOTPClient,
  organizationClient,
  twoFactorClient,
} from 'better-auth/client/plugins';
import {
  admin,
  type AdminOptions,
  emailOTP,
  organization,
  type OrganizationOptions,
  twoFactor,
} from 'better-auth/plugins';
import { createAuthClient } from 'better-auth/react';

if (
  process.env['NEXT_PUBLIC_BACKEND_BASE_PATH'] === undefined ||
  process.env['NEXT_PUBLIC_BACKEND_BASE_URL'] === undefined
) {
  throw new Error(
    'Environment variables NEXT_PUBLIC_BACKEND_BASE_PATH and NEXT_PUBLIC_BACKEND_BASE_URL must be defined',
  );
}

type AdminReturnType = ReturnType<typeof admin<AdminOptions>>;

type AdminClientReturnType = Omit<
  ReturnType<typeof adminClient<object>>,
  '$InferServerPlugin'
> & {
  $InferServerPlugin: AdminReturnType;
} & BetterAuthClientPlugin;

type EmailOtpReturnType = ReturnType<typeof emailOTP>;

type EmailOtpClientReturnType = Omit<
  ReturnType<typeof emailOTPClient>,
  '$InferServerPlugin'
> & {
  $InferServerPlugin: EmailOtpReturnType;
} & BetterAuthClientPlugin;

type OrganizationReturnType = ReturnType<
  typeof organization<OrganizationOptions>
>;

type TwoFactorReturnType = ReturnType<typeof twoFactor>;

type TwoFactorClientReturnType = Omit<
  ReturnType<typeof twoFactorClient>,
  '$InferServerPlugin'
> & {
  $InferServerPlugin: TwoFactorReturnType;
} & BetterAuthClientPlugin;

/*
 * Hack to get a simple enough type for the organization client plugin.
 * Otherwise, typescript infers <typeof organizationClient> as any, breaking
 * client type inference
 */
type OrganizationClientReturnType = Omit<
  ReturnType<typeof organizationClient<object>>,
  '$InferServerPlugin'
> & {
  $InferServerPlugin: OrganizationReturnType;
};

export const betterAuthClient = createAuthClient({
  basePath: process.env['NEXT_PUBLIC_BACKEND_BASE_PATH'],
  baseURL: process.env['NEXT_PUBLIC_BACKEND_BASE_URL'],
  plugins: [
    adminClient() as AdminClientReturnType,
    emailOTPClient() as EmailOtpClientReturnType,
    organizationClient() as OrganizationClientReturnType,
    twoFactorClient() as TwoFactorClientReturnType,
  ],
});

// export type BetterAuthSession = typeof betterAuthClient.$Infer.Session;
export type BetterAuthOrg = typeof betterAuthClient.$Infer.Organization;
