import type { ClientOptions, InferClientAPI } from 'better-auth';
import {
  adminClient,
  emailOTPClient,
  organizationClient,
  twoFactorClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

if (
  process.env['NEXT_PUBLIC_BACKEND_BASE_PATH'] === undefined ||
  process.env['NEXT_PUBLIC_BACKEND_BASE_URL'] === undefined
) {
  throw new Error(
    'Environment variables NEXT_PUBLIC_BACKEND_BASE_PATH and NEXT_PUBLIC_BACKEND_BASE_URL must be defined',
  );
}

export interface AppBetterAuthOptions {
  basePath: string;
  baseURL: string;
  plugins: AppBetterAuthOptionsPlugins;
}

type AppBetterAuthOptionsPlugins = [
  ReturnType<typeof adminClient>,
  ReturnType<typeof emailOTPClient>,
  ReturnType<typeof organizationClient>,
  ReturnType<typeof twoFactorClient>,
];

const optionsPlugins: AppBetterAuthOptionsPlugins = [
  adminClient(),
  emailOTPClient(),
  organizationClient(),
  twoFactorClient(),
];

const options: AppBetterAuthOptions = {
  basePath: process.env['NEXT_PUBLIC_BACKEND_BASE_PATH'],
  baseURL: process.env['NEXT_PUBLIC_BACKEND_BASE_URL'],
  plugins: optionsPlugins,
} satisfies ClientOptions;

export const betterAuthClient: InferClientAPI<AppBetterAuthOptions> =
  createAuthClient(options);
