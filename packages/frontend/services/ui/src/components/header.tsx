'use client';

import { GraduationCap } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { betterAuthClient } from '@/lib/auth-client';

interface HeaderProps {
  onSignInClick?: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  const { data: session } = betterAuthClient.useSession();

  const handleSignOut = () => {
    void betterAuthClient.signOut();
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">Academy Manager</span>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          {session?.user ? (
            <Button onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <Button onClick={onSignInClick}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
