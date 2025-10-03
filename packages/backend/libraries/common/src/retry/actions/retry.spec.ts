import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  vitest,
} from 'vitest';

import { ConstantRetryOptionsStrategy } from '../models/ConstantRetryOptionsStrategy';
import { RetryOptions } from '../models/RetryOptions';
import { RetryOptionsStrategyKind } from '../models/RetryOptionsStrategyKind';
import { retry } from './retry';

describe(retry, () => {
  let functionMock: Mock<() => unknown>;

  beforeAll(() => {
    functionMock = vitest.fn();
  });

  describe('having retryOptions with delayMs zero', () => {
    let retryOptionsFixture: RetryOptions<unknown>;

    beforeAll(() => {
      retryOptionsFixture = {
        operation: functionMock,
        strategy: {
          delayMs: 0,
          kind: RetryOptionsStrategyKind.constant,
        },
      };
    });

    describe('when called, and function does not throw', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock.mockReturnValueOnce(functionResultFixture);

        result = await retry(retryOptionsFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call the function', () => {
        expect(functionMock).toHaveBeenCalledExactlyOnceWith();
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws once', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        result = await retry(retryOptionsFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function twice', () => {
        expect(functionMock).toHaveBeenCalledTimes(2);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
      });

      it('should not call setTimeout', () => {
        expect(setTimeout).not.toHaveBeenCalled();
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });
  });

  describe('having retryOptions with kind constant and delayMs one', () => {
    let retryOptionsFixture: RetryOptions<unknown>;

    beforeAll(() => {
      retryOptionsFixture = {
        operation: functionMock,
        strategy: {
          delayMs: 1,
          kind: RetryOptionsStrategyKind.constant,
          maxAttempts: 3,
        },
      };
    });

    describe('when called, and function does not throw', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock.mockReturnValueOnce(functionResultFixture);

        result = await retry(retryOptionsFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call the function', () => {
        expect(functionMock).toHaveBeenCalledExactlyOnceWith();
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws once', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

        await vitest.advanceTimersByTimeAsync(
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );

        result = await resultPromise;
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function twice', () => {
        expect(functionMock).toHaveBeenCalledTimes(2);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
      });

      it('should call setTimeout', () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws twice', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

        await vitest.advanceTimersByTimeAsync(
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );
        await vitest.advanceTimersByTimeAsync(
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );

        result = await resultPromise;
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function three times', () => {
        expect(functionMock).toHaveBeenCalledTimes(3);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
        expect(functionMock).toHaveBeenNthCalledWith(3);
      });

      it('should call setTimeout', () => {
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenNthCalledWith(
          1,
          expect.any(Function),
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );
        expect(setTimeout).toHaveBeenNthCalledWith(
          2,
          expect.any(Function),
          (retryOptionsFixture.strategy as ConstantRetryOptionsStrategy)
            .delayMs,
        );
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });
  });

  describe('having retryOptions with kind exponential and delayMs one and factor 2', () => {
    let retryOptionsFixture: RetryOptions<unknown>;

    beforeAll(() => {
      retryOptionsFixture = {
        operation: functionMock,
        strategy: {
          factor: 2,
          initialDelayMs: 1,
          kind: RetryOptionsStrategyKind.exponential,
          maxAttempts: 3,
        },
      };
    });

    describe('when called, and function does not throw', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock.mockReturnValueOnce(functionResultFixture);

        result = await retry(retryOptionsFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call the function', () => {
        expect(functionMock).toHaveBeenCalledExactlyOnceWith();
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws once', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

        await vitest.advanceTimersByTimeAsync(1);

        result = await resultPromise;
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function twice', () => {
        expect(functionMock).toHaveBeenCalledTimes(2);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
      });

      it('should call setTimeout with exponential delay', () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1);
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws twice', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

        await vitest.advanceTimersByTimeAsync(1);
        await vitest.advanceTimersByTimeAsync(2);

        result = await resultPromise;
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function three times', () => {
        expect(functionMock).toHaveBeenCalledTimes(3);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
        expect(functionMock).toHaveBeenNthCalledWith(3);
      });

      it('should call setTimeout with exponential delays', () => {
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 1);
        expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 2);
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });

    describe('when called, and function throws three times (exhausts maxAttempts)', () => {
      let errorFixture: Error;

      let errorResult: unknown;

      beforeAll(async () => {
        errorFixture = new Error('Test error');

        functionMock
          .mockImplementationOnce(() => {
            throw errorFixture;
          })
          .mockImplementationOnce(() => {
            throw errorFixture;
          })
          .mockImplementationOnce(() => {
            throw errorFixture;
          });

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        try {
          const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

          await vitest.advanceTimersByTimeAsync(1);
          vitest.advanceTimersByTime(2);

          await resultPromise;
        } catch (error: unknown) {
          errorResult = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function three times', () => {
        expect(functionMock).toHaveBeenCalledTimes(3);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
        expect(functionMock).toHaveBeenNthCalledWith(3);
      });

      it('should call setTimeout with exponential delays', () => {
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 1);
        expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 2);
      });

      it('should throw the last error', () => {
        expect(errorResult).toBe(errorFixture);
      });
    });
  });

  describe('having retryOptions with kind exponential with maxDelayMs', () => {
    let retryOptionsFixture: RetryOptions<unknown>;

    beforeAll(() => {
      retryOptionsFixture = {
        operation: functionMock,
        strategy: {
          factor: 10,
          initialDelayMs: 1,
          kind: RetryOptionsStrategyKind.exponential,
          maxAttempts: 3,
          maxDelayMs: 5,
        },
      };
    });

    describe('when called, and function throws twice', () => {
      let functionResultFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        functionResultFixture = Symbol();

        functionMock
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockImplementationOnce(() => {
            throw new Error('Test error');
          })
          .mockReturnValueOnce(functionResultFixture);

        vitest.useFakeTimers();

        vitest.spyOn(global, 'setTimeout');

        const resultPromise: Promise<unknown> = retry(retryOptionsFixture);

        await vitest.advanceTimersByTimeAsync(1);
        await vitest.advanceTimersByTimeAsync(5);

        result = await resultPromise;
      });

      afterAll(() => {
        vitest.clearAllMocks();
        vitest.useRealTimers();
      });

      it('should call the function three times', () => {
        expect(functionMock).toHaveBeenCalledTimes(3);
        expect(functionMock).toHaveBeenNthCalledWith(1);
        expect(functionMock).toHaveBeenNthCalledWith(2);
        expect(functionMock).toHaveBeenNthCalledWith(3);
      });

      it('should call setTimeout with capped exponential delays', () => {
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 1);
        expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 5);
      });

      it('should return expected result', () => {
        expect(result).toBe(functionResultFixture);
      });
    });
  });
});
