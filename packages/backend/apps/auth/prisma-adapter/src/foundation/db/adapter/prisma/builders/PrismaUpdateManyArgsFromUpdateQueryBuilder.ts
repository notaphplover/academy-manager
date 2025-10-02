import { Builder } from '@academyjs/backend-common';

interface UpdateQuery<TFindQuery, TSetQuery> {
  findQuery: TFindQuery;
  setQuery: TSetQuery;
}

export interface BasePrismaUpdateManyArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any;
}

export class PrismaUpdateManyArgsFromUpdateQueryBuilder<
  TFindQuery,
  TSetQuery,
  TPrismaUpdateManyArgs extends BasePrismaUpdateManyArgs,
> implements
    Builder<TPrismaUpdateManyArgs, [UpdateQuery<TFindQuery, TSetQuery>]>
{
  readonly #prismaFindManyArgsFromFindQueryBuilder: Builder<
    {
      where?: TPrismaUpdateManyArgs['where'];
    },
    [TFindQuery]
  >;
  readonly #prismaUpdateManyArgsDataFromSetQueryBuilder: Builder<
    TPrismaUpdateManyArgs['data'],
    [TSetQuery]
  >;

  constructor(
    prismaFindManyArgsFromFindQueryBuilder: Builder<
      {
        where?: TPrismaUpdateManyArgs['where'];
      },
      [TFindQuery]
    >,
    prismaUpdateManyArgsDataFromSetQueryBuilder: Builder<
      TPrismaUpdateManyArgs['data'],
      [TSetQuery]
    >,
  ) {
    this.#prismaFindManyArgsFromFindQueryBuilder =
      prismaFindManyArgsFromFindQueryBuilder;
    this.#prismaUpdateManyArgsDataFromSetQueryBuilder =
      prismaUpdateManyArgsDataFromSetQueryBuilder;
  }

  public build(
    updateQuery: UpdateQuery<TFindQuery, TSetQuery>,
  ): TPrismaUpdateManyArgs {
    const updateManyArgsWhere: TPrismaUpdateManyArgs['where'] =
      this.#prismaFindManyArgsFromFindQueryBuilder.build(
        updateQuery.findQuery,
      ).where;

    const prismaUpdateManyArgs: TPrismaUpdateManyArgs = {
      data: this.#prismaUpdateManyArgsDataFromSetQueryBuilder.build(
        updateQuery.setQuery,
      ),
    } as TPrismaUpdateManyArgs;

    if (updateManyArgsWhere !== undefined) {
      prismaUpdateManyArgs.where = updateManyArgsWhere;
    }

    return prismaUpdateManyArgs;
  }
}
