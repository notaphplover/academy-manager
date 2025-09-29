import { BaseRetryOptionsStrategy } from './BaseRetryOptionsStrategy';
import { RetryOptionsStrategyKind } from './RetryOptionsStrategyKind';

export interface ExponentialRetryOptionsStrategy
  extends BaseRetryOptionsStrategy<RetryOptionsStrategyKind.exponential> {
  initialDelayMs: number;
  maxDelayMs?: number;
  factor: number;
}
