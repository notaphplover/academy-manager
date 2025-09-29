import { ConstantRetryOptionsStrategy } from './ConstantRetryOptionsStrategy';
import { ExponentialRetryOptionsStrategy } from './ExponentialRetryOptionsStrategy';

export type RetryOptionsStrategy =
  | ConstantRetryOptionsStrategy
  | ExponentialRetryOptionsStrategy;
