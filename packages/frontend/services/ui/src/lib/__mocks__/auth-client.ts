import { type Mocked, vitest } from 'vitest';

import type { betterAuthClient as original } from '../auth-client';

export const betterAuthClient: Mocked<typeof original> = {
  signIn: {
    email: vitest.fn(),
  } as Partial<(typeof original)['signIn']>,
} as Partial<Mocked<typeof original>> as Mocked<typeof original>;
