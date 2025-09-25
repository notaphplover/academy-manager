import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { Environment } from '../models/Environment';
import { EnvironmentLoader } from './EnvironmentLoader';
import { EnvironmentService } from './EnvironmentService';

describe(EnvironmentService, () => {
  let environmentLoaderMock: Mocked<EnvironmentLoader>;
  let environmentService: EnvironmentService;

  beforeAll(() => {
    environmentLoaderMock = {
      env: Symbol() as unknown as Environment,
    } as Partial<Mocked<EnvironmentLoader>> as Mocked<EnvironmentLoader>;

    environmentService = new EnvironmentService(environmentLoaderMock);
  });

  describe('.getEnvironment', () => {
    let result: unknown;

    beforeAll(() => {
      result = environmentService.getEnvironment();
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should return environmentLoaderMock.env', () => {
      expect(result).toBe(environmentLoaderMock.env);
    });
  });
});
