import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { Builder } from '@academyjs/backend-common';

import {
  BasePrismaUpdateManyArgs,
  PrismaUpdateManyArgsFromUpdateQueryBuilder,
} from './PrismaUpdateManyArgsFromUpdateQueryBuilder';

describe(PrismaUpdateManyArgsFromUpdateQueryBuilder, () => {
  let prismaFindManyArgsFromFindQueryBuilderMock: Mocked<
    Builder<
      {
        where?: BasePrismaUpdateManyArgs['where'];
      },
      [unknown]
    >
  >;
  let prismaUpdateManyArgsDataFromSetQueryBuilderMock: Mocked<
    Builder<BasePrismaUpdateManyArgs['data'], [unknown]>
  >;

  let prismaUpdateManyArgsFromUpdateQueryBuilder: PrismaUpdateManyArgsFromUpdateQueryBuilder<
    unknown,
    unknown,
    BasePrismaUpdateManyArgs
  >;

  beforeAll(() => {
    prismaFindManyArgsFromFindQueryBuilderMock = {
      build: vitest.fn(),
    };
    prismaUpdateManyArgsDataFromSetQueryBuilderMock = {
      build: vitest.fn(),
    };

    prismaUpdateManyArgsFromUpdateQueryBuilder =
      new PrismaUpdateManyArgsFromUpdateQueryBuilder(
        prismaFindManyArgsFromFindQueryBuilderMock,
        prismaUpdateManyArgsDataFromSetQueryBuilderMock,
      );
  });

  describe('.build', () => {
    describe('when called, and prismaFindManyArgsFromFindQueryBuilder.build() returns args with undefined where', () => {
      let findQueryFixture: unknown;
      let setQueryFixture: unknown;

      let prismaFindManyArgsFromFindQueryBuilderResultFixture: {
        where?: BasePrismaUpdateManyArgs['where'];
      };
      let prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture: BasePrismaUpdateManyArgs['data'];

      let result: unknown;

      beforeAll(() => {
        prismaFindManyArgsFromFindQueryBuilderResultFixture = {
          where: undefined,
        };
        prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture = {
          some: 'data',
        };

        prismaFindManyArgsFromFindQueryBuilderMock.build.mockReturnValueOnce(
          prismaFindManyArgsFromFindQueryBuilderResultFixture,
        );
        prismaUpdateManyArgsDataFromSetQueryBuilderMock.build.mockReturnValueOnce(
          prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture,
        );

        result = prismaUpdateManyArgsFromUpdateQueryBuilder.build({
          findQuery: findQueryFixture,
          setQuery: setQueryFixture,
        });
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call prismaFindManyArgsFromFindQueryBuilder.build()', () => {
        expect(
          prismaFindManyArgsFromFindQueryBuilderMock.build,
        ).toHaveBeenCalledExactlyOnceWith(findQueryFixture);
      });

      it('should call prismaUpdateManyArgsDataFromSetQueryBuilder.build()', () => {
        expect(
          prismaUpdateManyArgsDataFromSetQueryBuilderMock.build,
        ).toHaveBeenCalledExactlyOnceWith(setQueryFixture);
      });

      it('should return expected result', () => {
        const expected: BasePrismaUpdateManyArgs = {
          data: prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture,
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and prismaFindManyArgsFromFindQueryBuilder.build() returns args with where', () => {
      let findQueryFixture: unknown;
      let setQueryFixture: unknown;

      let prismaFindManyArgsFromFindQueryBuilderResultFixture: {
        where?: BasePrismaUpdateManyArgs['where'];
      };
      let prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture: BasePrismaUpdateManyArgs['data'];

      let result: unknown;

      beforeAll(() => {
        prismaFindManyArgsFromFindQueryBuilderResultFixture = {
          where: Symbol(),
        };
        prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture = {
          some: 'data',
        };

        prismaFindManyArgsFromFindQueryBuilderMock.build.mockReturnValueOnce(
          prismaFindManyArgsFromFindQueryBuilderResultFixture,
        );
        prismaUpdateManyArgsDataFromSetQueryBuilderMock.build.mockReturnValueOnce(
          prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture,
        );

        result = prismaUpdateManyArgsFromUpdateQueryBuilder.build({
          findQuery: findQueryFixture,
          setQuery: setQueryFixture,
        });
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call prismaFindManyArgsFromFindQueryBuilder.build()', () => {
        expect(
          prismaFindManyArgsFromFindQueryBuilderMock.build,
        ).toHaveBeenCalledExactlyOnceWith(findQueryFixture);
      });

      it('should call prismaUpdateManyArgsDataFromSetQueryBuilder.build()', () => {
        expect(
          prismaUpdateManyArgsDataFromSetQueryBuilderMock.build,
        ).toHaveBeenCalledExactlyOnceWith(setQueryFixture);
      });

      it('should return expected result', () => {
        const expected: BasePrismaUpdateManyArgs = {
          data: prismaUpdateManyArgsDataFromSetQueryBuilderResultFixture,
          where: prismaFindManyArgsFromFindQueryBuilderResultFixture.where,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
