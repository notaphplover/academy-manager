import { RetryOptions } from '../models/RetryOptions';
import { RetryOptionsStrategyKind } from '../models/RetryOptionsStrategyKind';

export async function retry<T>(options: RetryOptions<T>): Promise<T> {
  const { operation, strategy }: RetryOptions<T> = options;
  const maxAttempts: number = strategy.maxAttempts ?? Number.POSITIVE_INFINITY;

  if (maxAttempts <= 0) {
    throw new Error('maxAttempts must be greater than zero.');
  }

  let lastError: unknown;

  for (let attempt: number = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result: T = await operation();
      return result;
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        break;
      }

      const delayMs: number = calculateDelay(strategy, attempt);

      if (delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

function calculateDelay(
  strategy: RetryOptions<unknown>['strategy'],
  attempt: number,
): number {
  switch (strategy.kind) {
    case RetryOptionsStrategyKind.constant:
      return strategy.delayMs;

    case RetryOptionsStrategyKind.exponential: {
      const delay: number =
        strategy.initialDelayMs * Math.pow(strategy.factor, attempt - 1);
      return strategy.maxDelayMs !== undefined
        ? Math.min(delay, strategy.maxDelayMs)
        : delay;
    }

    default:
      return 0;
  }
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve: () => void) => {
    setTimeout(resolve, ms);
  });
}
