import { BaseRetryOptionsStrategy } from './BaseRetryOptionsStrategy';
import { RetryOptionsStrategyKind } from './RetryOptionsStrategyKind';

export interface ConstantRetryOptionsStrategy
  extends BaseRetryOptionsStrategy<RetryOptionsStrategyKind.constant> {
  delayMs: number;
}
