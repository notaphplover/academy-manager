import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

vitest.mock('@academyjs/auth-prisma');
vitest.mock('better-auth/plugins');
vitest.mock('better-auth/adapters/prisma');

import { PrismaClient } from '@academyjs/auth-prisma';
import { MailDeliveryOutputPort } from '@academyjs/backend-application-mail';
import { Adapter, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  emailOTP,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';

import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from '../../../../mail/applcation/builders/MailDeliveryOptionsFromSendOtpMailOptionsBuilder';
import { AppBetterAuthOptions } from '../models/AppBetterAuthOptions';
import { BetterAuthOptionsFromEnvBuilder } from './BetterAuthOptionsFromEnvBuilder';

describe(BetterAuthOptionsFromEnvBuilder, () => {
  let mailDeliveryOutputPortMock: Mocked<MailDeliveryOutputPort>;
  let mailDeliveryOptionsFromSendOtpMailOptionsBuilder: Mocked<MailDeliveryOptionsFromSendOtpMailOptionsBuilder>;

  let betterAuthOptionsFromEnvBuilder: BetterAuthOptionsFromEnvBuilder;

  beforeAll(() => {
    mailDeliveryOutputPortMock = {
      send: vitest.fn(),
    };
    mailDeliveryOptionsFromSendOtpMailOptionsBuilder = {
      build: vitest.fn(),
    } as Partial<
      Mocked<MailDeliveryOptionsFromSendOtpMailOptionsBuilder>
    > as Mocked<MailDeliveryOptionsFromSendOtpMailOptionsBuilder>;

    betterAuthOptionsFromEnvBuilder = new BetterAuthOptionsFromEnvBuilder(
      mailDeliveryOutputPortMock,
      mailDeliveryOptionsFromSendOtpMailOptionsBuilder,
    );
  });

  describe('.build', () => {
    describe('when called', () => {
      let prismaAdapterResult: (options: BetterAuthOptions) => Adapter;
      let emailOtpResult: ReturnType<typeof emailOTP>;
      let organizationResult: ReturnType<typeof organization>;
      let openApiResult: ReturnType<typeof openAPI>;
      let twoFactorResult: ReturnType<typeof twoFactor>;

      let result: unknown;

      beforeAll(() => {
        prismaAdapterResult = Symbol() as unknown as (
          options: BetterAuthOptions,
        ) => Adapter;
        emailOtpResult = Symbol() as unknown as ReturnType<typeof emailOTP>;
        organizationResult = Symbol() as unknown as ReturnType<
          typeof organization
        >;
        openApiResult = Symbol() as unknown as ReturnType<typeof openAPI>;
        twoFactorResult = Symbol() as unknown as ReturnType<typeof twoFactor>;

        vitest.mocked(prismaAdapter).mockReturnValueOnce(prismaAdapterResult);
        vitest.mocked(emailOTP).mockReturnValueOnce(emailOtpResult);
        vitest.mocked(organization).mockReturnValueOnce(organizationResult);
        vitest.mocked(openAPI).mockReturnValueOnce(openApiResult);
        vitest.mocked(twoFactor).mockReturnValueOnce(twoFactorResult);

        result = betterAuthOptionsFromEnvBuilder.build();
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call prismaAdapter()', () => {
        expect(prismaAdapter).toHaveBeenCalledTimes(1);
        expect(prismaAdapter).toHaveBeenCalledWith(expect.any(PrismaClient), {
          provider: 'postgresql',
        });
      });

      it('should call emailOTP()', () => {
        expect(emailOTP).toHaveBeenCalledTimes(1);
        expect(emailOTP).toHaveBeenCalledWith({
          sendVerificationOTP: expect.any(Function),
        });
      });

      it('should call organization()', () => {
        expect(organization).toHaveBeenCalledTimes(1);
        expect(organization).toHaveBeenCalledWith();
      });

      it('should call openAPI()', () => {
        expect(openAPI).toHaveBeenCalledTimes(1);
        expect(openAPI).toHaveBeenCalledWith();
      });

      it('should call twoFactor()', () => {
        expect(twoFactor).toHaveBeenCalledTimes(1);
        expect(twoFactor).toHaveBeenCalledWith();
      });

      it('should return expected result', () => {
        const expected: AppBetterAuthOptions = {
          database: prismaAdapterResult,
          emailAndPassword: {
            enabled: true,
          },
          logger: {
            disabled: false,
            level: 'debug',
          },
          plugins: [
            emailOtpResult,
            organizationResult,
            openApiResult,
            twoFactorResult,
          ],
          trustedOrigins: ['*'],
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
