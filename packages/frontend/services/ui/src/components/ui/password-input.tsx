import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export function PasswordInput({
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const visibilityIcon = isPasswordVisible ? (
    <VisibilityOffIcon />
  ) : (
    <VisibilityIcon />
  );

  return (
    <InputGroup>
      <InputGroupInput
        type={isPasswordVisible ? 'text' : 'password'}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          className="rounded-full"
          onClick={() => {
            setIsPasswordVisible((value: boolean) => !value);
          }}
          size="icon-xs"
        >
          {visibilityIcon}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
