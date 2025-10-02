import { beforeAll, describe, expect, it } from 'vitest';

import { UserFindQuery } from '@academyjs/backend-auth-domain';

import { Prisma } from '../../../../../generated';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from './UserPrismaFindManyArgsFromUserFindQueryBuilder';

describe(UserPrismaFindManyArgsFromUserFindQueryBuilder, () => {
  let userPrismaFindManyArgsFromUserFindQueryBuilder: UserPrismaFindManyArgsFromUserFindQueryBuilder;

  beforeAll(() => {
    userPrismaFindManyArgsFromUserFindQueryBuilder =
      new UserPrismaFindManyArgsFromUserFindQueryBuilder();
  });

  describe('.build', () => {
    describe('having a UserFindQuery with no id', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = {};
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result =
            userPrismaFindManyArgsFromUserFindQueryBuilder.build(
              userFindQueryFixture,
            );
        });

        it('should return expected result', () => {
          const expected: Prisma.UserFindManyArgs = {
            where: {},
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a UserFindQuery with empty id array', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = {
          id: [],
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result =
            userPrismaFindManyArgsFromUserFindQueryBuilder.build(
              userFindQueryFixture,
            );
        });

        it('should return expected result', () => {
          const expected: Prisma.UserFindManyArgs = {
            where: {},
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a UserFindQuery with single id', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = {
          id: ['user-id-1'],
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result =
            userPrismaFindManyArgsFromUserFindQueryBuilder.build(
              userFindQueryFixture,
            );
        });

        it('should return expected result', () => {
          const expected: Prisma.UserFindManyArgs = {
            where: {
              id: { in: userFindQueryFixture.id as string[] },
            },
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a UserFindQuery with empty email array', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = {
          email: [],
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result =
            userPrismaFindManyArgsFromUserFindQueryBuilder.build(
              userFindQueryFixture,
            );
        });

        it('should return expected result', () => {
          const expected: Prisma.UserFindManyArgs = {
            where: {},
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a UserFindQuery with single email', () => {
      let userFindQueryFixture: UserFindQuery;

      beforeAll(() => {
        userFindQueryFixture = {
          email: ['user@example.com'],
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result =
            userPrismaFindManyArgsFromUserFindQueryBuilder.build(
              userFindQueryFixture,
            );
        });

        it('should return expected result', () => {
          const expected: Prisma.UserFindManyArgs = {
            where: {
              email: { in: userFindQueryFixture.email as string[] },
            },
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });
  });
});
