import { ServerType } from '@hono/node-server';
import { Logger } from '@inversifyjs/logger';

export function registerSignalHandlers(
  httpServer: ServerType,
  logger: Logger,
): void {
  registerExitSignalHandlers(httpServer, logger, ['SIGINT', 'SIGTERM']);
}

async function closeServerGracefully(
  httpServer: ServerType,
  logger: Logger,
): Promise<void> {
  logger.info('Closing signal received.');
  logger.info('Closing server...');

  await new Promise<void>(
    (resolve: () => void, reject: (reason?: unknown) => void) => {
      httpServer.close((error?: Error) => {
        if (error === undefined) {
          resolve();
        } else {
          logger.error(
            `Error occurred while closing the server: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`,
          );
          reject(error);
        }
      });
    },
  );

  logger.info('Server closed.');
}

function exitSignalHandler(httpServer: ServerType, logger: Logger): () => void {
  return () => {
    void closeServerGracefully(httpServer, logger);
  };
}

function registerExitSignalHandlers(
  httpServer: ServerType,
  logger: Logger,
  signals: NodeJS.Signals[],
): void {
  for (const signal of signals) {
    process.once(signal, exitSignalHandler(httpServer, logger));
  }
}
