import { beforeAll, describe, expect, it } from 'vitest';

import { UserPrismaUpdateManyArgsData } from '../models/UserPrismaUpdateManyArgsData';
import { UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder } from './UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder';

describe(UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder, () => {
  let userPrismaUpdateManyArgsDataFromUserSetQueryBuilder: UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder;

  beforeAll(() => {
    userPrismaUpdateManyArgsDataFromUserSetQueryBuilder =
      new UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder();
  });

  describe('.build', () => {
    describe('having a UserSetQuery with role', () => {
      describe('when called', () => {
        let roleFixture: string;

        let result: unknown;

        beforeAll(() => {
          roleFixture = 'admin';

          result = userPrismaUpdateManyArgsDataFromUserSetQueryBuilder.build({
            role: roleFixture,
          });
        });

        it('should return expected result', () => {
          const expected: UserPrismaUpdateManyArgsData = { role: roleFixture };

          expect(result).toStrictEqual(expected);
        });
      });
    });
  });
});
