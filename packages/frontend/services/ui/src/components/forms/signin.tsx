'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { betterAuthClient } from '@/lib/auth-client';

const PASSWORD_MIN_LENGTH = 8;

const schema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters long'),
});

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>): Promise<void> {
    try {
      const result = await betterAuthClient.signIn.email(values);

      if (result.error === null) {
        router.push('/dashboard');
      } else {
        toast.error(result.error.message ?? 'Failed to sign in');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    }
  }

  return (
    <Form {...form}>
      <form
        data-testid="signin-form"
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  data-testid="signin-email-input"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  data-testid="signin-password-input"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
