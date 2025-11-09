'use client';

import { Building2, Menu } from 'lucide-react';
import { useState } from 'react';

import { UpdateOrganizationForm } from '@/components/forms/update-organization';
import { OrganizationLogo } from '@/components/organization/organization-logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { betterAuthClient, type BetterAuthOrg } from '@/lib/auth-client';

export function OrganizationList({
  organizations,
}: {
  organizations: BetterAuthOrg[];
}) {
  const [editingOrg, setEditingOrg] = useState<BetterAuthOrg | null>(null);

  if (editingOrg) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              Update Organization
            </CardTitle>
            <CardDescription className="text-center">
              Update the organization details below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UpdateOrganizationForm
              organization={editingOrg}
              onCancel={() => {
                setEditingOrg(null);
              }}
              onSuccess={() => {
                setEditingOrg(null);
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => (
          <TableRow key={org.id}>
            <TableCell>
              <OrganizationLogo logo={org.logo} name={org.name} />
            </TableCell>
            <TableCell className="font-medium">{org.name}</TableCell>
            <TableCell>{org.slug}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="w-8 h-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      void betterAuthClient.organization.delete({
                        organizationId: org.id,
                      });
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingOrg(org);
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
