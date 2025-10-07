import { type Mocked, vitest } from 'vitest';

import type { InferClientAPI } from 'better-auth';

import type { AppBetterAuthOptions } from '../auth-client';

export const betterAuthClient: Mocked<InferClientAPI<AppBetterAuthOptions>> = {
  signIn: {
    email: vitest.fn(),
  } as Partial<
    InferClientAPI<AppBetterAuthOptions>['signIn']
  > as InferClientAPI<AppBetterAuthOptions>['signIn'],
} as Partial<Mocked<InferClientAPI<AppBetterAuthOptions>>> as Mocked<
  InferClientAPI<AppBetterAuthOptions>
>;
