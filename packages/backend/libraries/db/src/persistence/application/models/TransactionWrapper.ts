import { Wrapper } from '@academyjs/backend-common';

export interface TransactionWrapper<T> extends Wrapper<T>, AsyncDisposable {
  rollback(): Promise<void>;
  tryCommit(): Promise<void>;
}
