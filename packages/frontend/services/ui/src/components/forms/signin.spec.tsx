import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('next/navigation');

vitest.mock('@/lib/auth-client');

import {
  fireEvent,
  render,
  type RenderResult,
  waitFor,
} from '@testing-library/react';
import { act } from 'react';

import { betterAuthClient } from '@/lib/auth-client';

import { SignInForm } from './signin';

describe(SignInForm, () => {
  describe('having wrong form values', () => {
    describe('when called', () => {
      let emailInput: HTMLInputElement;
      let passwordInput: HTMLInputElement;

      beforeAll(() => {
        const renderResult: RenderResult = render(<SignInForm />);

        emailInput = renderResult.getByTestId(
          'signin-email-input',
        ) as HTMLInputElement;
        passwordInput = renderResult.getByTestId(
          'signin-password-input',
        ) as HTMLInputElement;
      });

      it('should have empty email input', () => {
        expect(emailInput.value).toBe('');
      });

      it('should have empty password input', () => {
        expect(passwordInput.value).toBe('');
      });

      describe('when called submit()', () => {
        let submitButton: HTMLButtonElement;

        let renderResult: RenderResult;

        let emailErrorMessageTextContent: string | undefined;
        let passwordErrorMessageTextContent: string | undefined;

        beforeAll(async () => {
          renderResult = render(<SignInForm />);
          submitButton = renderResult.getByRole('button', {
            name: /submit/i,
          }) as HTMLButtonElement;

          await act(async () => {
            fireEvent.click(submitButton);
          });

          await waitFor(() => {
            const emailErrorMessage = renderResult.container
              .querySelector('[data-testid="signin-email-input"]')
              ?.closest('[data-slot="form-item"]')
              ?.querySelector('[data-slot="form-message"]');

            const passwordErrorMessage = renderResult.container
              .querySelector('[data-testid="signin-password-input"]')
              ?.closest('[data-slot="form-item"]')
              ?.querySelector('[data-slot="form-message"]');

            expect(emailErrorMessage).toBeTruthy();
            expect(passwordErrorMessage).toBeTruthy();

            emailErrorMessageTextContent = emailErrorMessage?.textContent;
            passwordErrorMessageTextContent = passwordErrorMessage?.textContent;
          });
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should show email validation error', async () => {
          expect(emailErrorMessageTextContent).toBe('Invalid email address');
        });

        it('should show password validation error', async () => {
          expect(passwordErrorMessageTextContent).toBe(
            'Password must be at least 8 characters long',
          );
        });
      });
    });
  });

  describe('having valid form values', () => {
    let emailFixture: string;
    let passwordFixture: string;

    beforeAll(() => {
      emailFixture = 'test@example.com';
      passwordFixture = 'validpassword123';
    });

    describe('when called submit()', () => {
      beforeAll(async () => {
        vitest
          .mocked(betterAuthClient.signIn)
          .email.mockResolvedValueOnce({ error: null });

        const renderResult: RenderResult = render(<SignInForm />);

        const emailInput = renderResult.getByTestId(
          'signin-email-input',
        ) as HTMLInputElement;
        const passwordInput = renderResult.getByTestId(
          'signin-password-input',
        ) as HTMLInputElement;
        const submitButton = renderResult.getByRole('button', {
          name: /submit/i,
        }) as HTMLButtonElement;

        await act(async () => {
          fireEvent.change(emailInput, {
            target: { value: emailFixture },
          });
          fireEvent.change(passwordInput, {
            target: { value: passwordFixture },
          });
        });

        await act(async () => {
          fireEvent.click(submitButton);
        });
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call betterAuthClient.signIn.email()', async () => {
        expect(betterAuthClient.signIn.email).toHaveBeenCalledWith({
          email: emailFixture,
          password: passwordFixture,
        });
      });
    });
  });
});
