import { RetryOptionsStrategyKind } from './RetryOptionsStrategyKind';

export interface BaseRetryOptionsStrategy<
  TKind extends RetryOptionsStrategyKind,
> {
  kind: TKind;
  maxAttempts?: number;
}
