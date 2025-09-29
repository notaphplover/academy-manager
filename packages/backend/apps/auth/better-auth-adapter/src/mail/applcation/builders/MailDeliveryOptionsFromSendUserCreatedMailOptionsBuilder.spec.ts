import { beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import { MailDeliveryOptions } from '@academyjs/backend-application-mail';
import {
  Environment,
  EnvironmentService,
  MailConfig,
} from '@academyjs/backend-auth-env';

import { SendUserCreatedMailOptions } from '../models/SendUserCreatedMailOptions';
import { MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder } from './MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder';

describe(MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder, () => {
  let environmentFixture: Environment;

  let environmentServiceMock: Mocked<EnvironmentService>;
  let mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder: MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder;

  beforeAll(() => {
    environmentFixture = {
      mailConfig: {
        defaultAddress: 'default@example.com',
      } as Partial<MailConfig> as MailConfig,
    } as Partial<Environment> as Environment;

    environmentServiceMock = {
      getEnvironment: vitest.fn(),
    } as Partial<Mocked<EnvironmentService>> as Mocked<EnvironmentService>;

    environmentServiceMock.getEnvironment.mockReturnValue(environmentFixture);

    mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder =
      new MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder(
        environmentServiceMock,
      );
  });

  describe('.build', () => {
    let sendUserCreatedMailOptionsFixture: SendUserCreatedMailOptions;

    beforeAll(() => {
      sendUserCreatedMailOptionsFixture = {
        email: 'mail@example.com',
        name: 'username',
        password: 'initial-password',
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.build(
          sendUserCreatedMailOptionsFixture,
        );
      });

      it('should return MailDeliveryOptions', () => {
        const expected: MailDeliveryOptions = {
          from: environmentFixture.mailConfig.defaultAddress,
          html: expect.stringContaining(
            sendUserCreatedMailOptionsFixture.password,
          ) as unknown as string,
          subject: expect.any(String) as unknown as string,
          to: [sendUserCreatedMailOptionsFixture.email],
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
