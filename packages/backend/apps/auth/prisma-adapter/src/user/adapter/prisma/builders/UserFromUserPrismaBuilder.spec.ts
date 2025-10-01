import { beforeAll, describe, expect, it } from 'vitest';

import { User } from '@academyjs/backend-auth-domain';

import { User as PrismaUser } from '../../../../../generated';
import { UserFromUserPrismaBuilder } from './UserFromUserPrismaBuilder';

describe(UserFromUserPrismaBuilder, () => {
  let userFromUserPrismaBuilder: UserFromUserPrismaBuilder;

  beforeAll(() => {
    userFromUserPrismaBuilder = new UserFromUserPrismaBuilder();
  });

  describe('.build', () => {
    describe('having a prisma User with no role', () => {
      let prismaUserFixture: PrismaUser;

      beforeAll(() => {
        prismaUserFixture = {
          banExpires: null,
          banned: false,
          banReason: null,
          createdAt: new Date('2024-01-01T00:00:00.000Z'),
          email: 'mail@example.com',
          emailVerified: false,
          id: 'user-id',
          image: 'https://example.com/image.png',
          name: 'User Name',
          role: null,
          twoFactorEnabled: false,
          updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFromUserPrismaBuilder.build(prismaUserFixture);
        });

        it('should return expected result', () => {
          const expected: User = {
            email: prismaUserFixture.email,
            id: prismaUserFixture.id,
            name: prismaUserFixture.name,
            role: undefined,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a prisma User with role', () => {
      let prismaUserFixture: PrismaUser;

      beforeAll(() => {
        prismaUserFixture = {
          banExpires: null,
          banned: false,
          banReason: null,
          createdAt: new Date('2024-01-01T00:00:00.000Z'),
          email: 'mail@example.com',
          emailVerified: false,
          id: 'user-id',
          image: 'https://example.com/image.png',
          name: 'User Name',
          role: 'admin',
          twoFactorEnabled: false,
          updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = userFromUserPrismaBuilder.build(prismaUserFixture);
        });

        it('should return expected result', () => {
          const expected: User = {
            email: prismaUserFixture.email,
            id: prismaUserFixture.id,
            name: prismaUserFixture.name,
            role: prismaUserFixture.role as string,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });
  });
});
