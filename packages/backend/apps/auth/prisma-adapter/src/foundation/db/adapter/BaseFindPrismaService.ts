import { FindManyPrismaService } from '@academyjs/backend-db';

import { PrismaClient } from '../../../../generated';
import * as runtime from '../../../../generated/runtime/library.js';

export abstract class BaseFindManyPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindManyArgs,
  TPrismaModel,
> extends FindManyPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindManyArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
