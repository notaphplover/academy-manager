import { Environment, EnvironmentService } from '@academyjs/backend-auth-env';
import { serve, ServerType } from '@hono/node-server';
import { InversifyHonoHttpAdapter } from '@inversifyjs/http-hono';
import { ConsoleLogger, Logger } from '@inversifyjs/logger';
import { Hono } from 'hono';
import { Container } from 'inversify';

import { CorsMiddleware } from '../../../cors/adapter/inversify/middlewares/CorsMiddleware';
import { buildContainer } from '../calculations/buildContainer';
import { registerSignalHandlers } from './registerSignalHandlers';

export async function bootstrap(): Promise<void> {
  const container: Container = await buildContainer();

  const environment: Environment = container
    .get(EnvironmentService)
    .getEnvironment();

  const logger: Logger = new ConsoleLogger();

  const inversifyHonoHttpAdapter: InversifyHonoHttpAdapter =
    new InversifyHonoHttpAdapter(container, {
      logger,
    });

  inversifyHonoHttpAdapter.applyGlobalMiddleware(CorsMiddleware);

  const hono: Hono = await inversifyHonoHttpAdapter.build();

  const server: ServerType = serve({
    fetch: hono.fetch,
    hostname: environment.host,
    port: environment.port,
  });

  registerSignalHandlers(server, logger);
}
