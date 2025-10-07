import { SignInForm } from '@/components/forms/signin';
import { ModeToggle } from '@/components/mode-toggle';

export default function Page() {
  return (
    <>
      <ModeToggle />
      <SignInForm />
    </>
  );
}
