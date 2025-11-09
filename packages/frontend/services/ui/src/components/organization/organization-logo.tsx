import { Building2 } from 'lucide-react';
import Image from 'next/image';

interface OrganizationLogoProps {
  logo: string | null | undefined;
  name: string;
}

export function OrganizationLogo({ logo, name }: OrganizationLogoProps) {
  if (logo === null || logo === undefined || logo === '') {
    return (
      <div className="flex items-center justify-center">
        <Building2 className="w-16 h-16 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={200}
        height={200}
        className="max-w-16 max-h-16 w-auto h-auto object-contain"
      />
    </div>
  );
}
