'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const schema = z.object({
  logo: z.url('Logo must be a valid URL').optional().or(z.literal('')),
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .regex(
      SLUG_REGEX,
      'Slug must be lowercase alphanumeric with hyphens (e.g., my-organization)',
    ),
});

interface CreateOrganizationFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function CreateOrganizationForm({
  onCancel,
  onSuccess,
}: CreateOrganizationFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      logo: '',
      name: '',
      slug: '',
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>): Promise<void> {
    try {
      const data: {
        logo?: string;
        name: string;
        slug: string;
      } = {
        name: values.name,
        slug: values.slug,
      };

      if (values.logo !== undefined && values.logo !== '') {
        data.logo = values.logo;
      }

      const result = await betterAuthClient.organization.create(data);

      if (result.error === null) {
        toast.success('Organization created successfully');
        onSuccess();
      } else {
        toast.error(result.error.message ?? 'Failed to create organization');
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create organization',
      );
    }
  }

  return (
    <Form {...form}>
      <form
        data-testid="create-organization-form"
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  data-testid="create-organization-name-input"
                  placeholder="Organization Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  data-testid="create-organization-slug-input"
                  placeholder="organization-slug"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  data-testid="create-organization-logo-input"
                  placeholder="https://example.com/logo.png"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Create
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
