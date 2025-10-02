import { UpdateManyPrismaService } from '@academyjs/backend-db';

import { PrismaClient } from '../../../../../../generated';
import * as runtime from '../../../../../../generated/runtime/library.js';

export abstract class BaseUpdatePrismaService<
  TModel,
  TUpdateQuery,
  TPrismaUpdateManyArgs,
  TPrismaModel,
> extends UpdateManyPrismaService<
  TModel,
  TUpdateQuery,
  TPrismaUpdateManyArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
