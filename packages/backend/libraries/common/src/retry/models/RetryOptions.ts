import { RetryOptionsStrategy } from './RetryOptionsStrategy';

export interface RetryOptions<T> {
  operation: () => T | Promise<T>;
  strategy: RetryOptionsStrategy;
}
