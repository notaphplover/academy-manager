import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import {
  MailDeliveryOptions,
  MailDeliveryOutputPort,
} from '@academyjs/backend-application-mail';
import { PopulateUsersOutputPortUser } from '@academyjs/backend-auth-application';

import { MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder } from '../../../../mail/applcation/builders/MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder';
import { SendUserCreatedMailOptions } from '../../../../mail/applcation/models/SendUserCreatedMailOptions';
import { AppBetterAuthOptions } from '../models/AppBetterAuthOptions';
import { BetterAuth } from '../models/BetterAuth';
import { PopulateUsersBetterAuthAdapter } from './PopulateUsersBetterAuthAdapter';

describe(PopulateUsersBetterAuthAdapter, () => {
  let betterAuthMock: Mocked<BetterAuth<AppBetterAuthOptions>>;
  let mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock: Mocked<MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder>;
  let mailDeliveryOutputPortMock: Mocked<MailDeliveryOutputPort>;

  let populateUsersBetterAuthAdapter: PopulateUsersBetterAuthAdapter;

  beforeAll(() => {
    betterAuthMock = {
      api: {
        signUpEmail: vitest.fn(),
      } as unknown,
    } as Partial<Mocked<BetterAuth<AppBetterAuthOptions>>> as Mocked<
      BetterAuth<AppBetterAuthOptions>
    >;
    mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock = {
      build: vitest.fn(),
    } as Partial<
      Mocked<MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder>
    > as Mocked<MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder>;
    mailDeliveryOutputPortMock = {
      send: vitest.fn(),
    };

    populateUsersBetterAuthAdapter = new PopulateUsersBetterAuthAdapter(
      betterAuthMock,
      mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock,
      mailDeliveryOutputPortMock,
    );
  });

  describe('.populateUsers', () => {
    let userFixture: PopulateUsersOutputPortUser;

    beforeAll(() => {
      userFixture = {
        email: 'test@example.com',
        name: 'Test User',
      };
    });

    describe('when called', () => {
      let mailDeliveryOptionsFixture: MailDeliveryOptions;
      let signUpEmailResult: Awaited<
        ReturnType<typeof betterAuthMock.api.signUpEmail>
      >;

      let result: unknown;

      beforeAll(async () => {
        mailDeliveryOptionsFixture = Symbol() as unknown as MailDeliveryOptions;
        signUpEmailResult = Symbol() as unknown as Awaited<
          ReturnType<typeof betterAuthMock.api.signUpEmail>
        >;

        vitest
          .mocked(betterAuthMock.api.signUpEmail)
          .mockResolvedValueOnce(signUpEmailResult);

        mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock.build.mockReturnValueOnce(
          mailDeliveryOptionsFixture,
        );

        result = await populateUsersBetterAuthAdapter.populateUsers([
          userFixture,
        ]);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call this.#betterAuth.api.signUpEmail()', () => {
        expect(betterAuthMock.api.signUpEmail).toHaveBeenCalledTimes(1);
        expect(betterAuthMock.api.signUpEmail).toHaveBeenCalledWith({
          body: {
            email: userFixture.email,
            name: userFixture.name,
            password: expect.any(String),
          },
        });
      });

      it('should call mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.build()', () => {
        const expected: SendUserCreatedMailOptions = {
          email: userFixture.email,
          name: userFixture.name,
          password: expect.any(String),
        };

        expect(
          mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock.build,
        ).toHaveBeenCalledTimes(1);
        expect(
          mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilderMock.build,
        ).toHaveBeenCalledWith(expected);
      });

      it('should call mailDeliveryOutputPort.send()', () => {
        expect(mailDeliveryOutputPortMock.send).toHaveBeenCalledTimes(1);
        expect(mailDeliveryOutputPortMock.send).toHaveBeenCalledWith(
          mailDeliveryOptionsFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
