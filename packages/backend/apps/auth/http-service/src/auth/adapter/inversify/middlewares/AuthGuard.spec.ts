import { beforeAll, describe, expect, it } from 'vitest';

import { HonoRequest } from 'hono';

import { AuthGuard } from './AuthGuard';

describe(AuthGuard, () => {
  let authGuard: AuthGuard;

  beforeAll(() => {
    authGuard = new AuthGuard();
  });

  describe('.activate', () => {
    describe('having a request with a path that is not blacklisted', () => {
      let requestFixture: HonoRequest;

      beforeAll(() => {
        requestFixture = {
          path: '/api/auth/some-path',
        } as Partial<HonoRequest> as HonoRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = authGuard.activate(requestFixture);
        });

        it('should return true', () => {
          expect(result).toBe(true);
        });
      });
    });

    describe('having a request with a path that is blacklisted', () => {
      let requestFixture: HonoRequest;

      beforeAll(() => {
        requestFixture = {
          path: '/api/auth/sign-up/email',
        } as Partial<HonoRequest> as HonoRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = authGuard.activate(requestFixture);
        });

        it('should return false', () => {
          expect(result).toBe(false);
        });
      });
    });
  });
});
