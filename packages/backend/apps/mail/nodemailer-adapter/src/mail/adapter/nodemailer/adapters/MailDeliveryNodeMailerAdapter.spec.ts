import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

vitest.mock('@academyjs/backend-common');

import { MailDeliveryOptions } from '@academyjs/backend-application-mail';
import {
  retry,
  RetryOptions,
  RetryOptionsStrategyKind,
} from '@academyjs/backend-common';
import nodemailer from 'nodemailer';

import { MailDeliveryNodeMailerAdapter } from './MailDeliveryNodeMailerAdapter';

describe(MailDeliveryNodeMailerAdapter, () => {
  let transporterMock: Mocked<
    nodemailer.Transporter<nodemailer.SentMessageInfo>
  >;

  let mailDeliveryNodeMailerAdapter: MailDeliveryNodeMailerAdapter;

  beforeAll(() => {
    transporterMock = {
      sendMail: vitest.fn(),
    } as Partial<
      Mocked<nodemailer.Transporter<nodemailer.SentMessageInfo>>
    > as Mocked<nodemailer.Transporter<nodemailer.SentMessageInfo>>;

    vitest
      .mocked(retry)
      .mockImplementation(async ({ operation }: RetryOptions<unknown>) =>
        operation(),
      );

    mailDeliveryNodeMailerAdapter = new MailDeliveryNodeMailerAdapter(
      transporterMock,
    );
  });

  describe('.send', () => {
    let mailDeliveryOptionsFixture: MailDeliveryOptions;

    beforeAll(() => {
      mailDeliveryOptionsFixture = {
        from: 'from.address@example.com',
        html: 'html fixture',
        subject: 'subject',
        text: 'text fixture',
        to: ['to.address@example.com'],
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        transporterMock.sendMail.mockResolvedValueOnce(undefined);

        result = await mailDeliveryNodeMailerAdapter.send(
          mailDeliveryOptionsFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call retry()', () => {
        const expectedRetryOptions: RetryOptions<void> = {
          operation: expect.any(Function),
          strategy: {
            factor: 2,
            initialDelayMs: 1000,
            kind: RetryOptionsStrategyKind.exponential,
            maxAttempts: 5,
          },
        };

        expect(retry).toHaveBeenCalledExactlyOnceWith(expectedRetryOptions);
      });

      it('should call transporter.sendMail()', () => {
        const expectedSendMailOptions: nodemailer.SendMailOptions = {
          from: mailDeliveryOptionsFixture.from,
          html: mailDeliveryOptionsFixture.html,
          subject: mailDeliveryOptionsFixture.subject,
          text: mailDeliveryOptionsFixture.text,
          to: mailDeliveryOptionsFixture.to,
        };

        expect(transporterMock.sendMail).toHaveBeenCalledExactlyOnceWith(
          expectedSendMailOptions,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
