import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { betterAuthClient } from '../lib/auth-client';

export const useSessionRedirection = (path: string): void => {
  const router = useRouter();
  const session = betterAuthClient.useSession();

  const user = session.data?.user;

  useEffect(() => {
    if (user !== undefined) {
      router.push(path);
    }
  }, [user]);
};
