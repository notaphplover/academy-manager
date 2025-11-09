'use client';

import { Building2, Plus } from 'lucide-react';
import { useState } from 'react';

import { CreateOrganizationForm } from '@/components/forms/create-organization';
import { Header } from '@/components/header';
import { OrganizationList } from '@/components/organization/organization-list';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNoSessionRedirection } from '@/hooks/useNoSessionRedirection';
import { betterAuthClient } from '@/lib/auth-client';

export default function Dashboard() {
  useNoSessionRedirection('/');
  const { data: orgs } = betterAuthClient.useListOrganizations();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5">
        <Header />
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <Building2 className="w-8 h-8" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Create Organization
              </CardTitle>
              <CardDescription className="text-center">
                Create a new organization to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CreateOrganizationForm
                onCancel={() => {
                  setShowCreateForm(false);
                }}
                onSuccess={() => {
                  setShowCreateForm(false);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => {
              setShowCreateForm(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Organization
          </Button>
        </div>
        <OrganizationList organizations={orgs ?? []} />
      </div>
    </div>
  );
}
