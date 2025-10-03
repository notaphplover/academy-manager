import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

vitest.mock('@inversifyjs/logger');

import { UserFindQuery, UserUpdateQuery } from '@academyjs/backend-auth-domain';
import {
  Environment,
  EnvironmentService,
  SuperAdminUser,
} from '@academyjs/backend-auth-env';
import { ConsoleLogger } from '@inversifyjs/logger';

import { FindManyUsersOutputPort } from '../output/FindManyUsersOutputPort';
import { PopulateUsersOutputPort } from '../output/PopulateUsersOutputPort';
import { UpdateManyUsersOutputPort } from '../output/UpdateManyUsersOutputPort';
import { SeedSuperAdminUsersInputPort } from './SeedSuperAdminUsersInputPort';

describe(SeedSuperAdminUsersInputPort, () => {
  let environmentFixture: Environment;
  let environmentServiceMock: Mocked<EnvironmentService>;
  let findManyUsersOutputPortMock: Mocked<FindManyUsersOutputPort>;
  let loggerMock: Mocked<ConsoleLogger>;
  let populateUsersOutputPortMock: Mocked<PopulateUsersOutputPort>;
  let superAdminListFixture: SuperAdminUser;
  let updateManyUsersOutputPortMock: Mocked<UpdateManyUsersOutputPort>;

  let seedSuperAdminUsersInputPort: SeedSuperAdminUsersInputPort;

  beforeAll(() => {
    environmentServiceMock = {
      getEnvironment: vitest.fn(),
    } as Partial<Mocked<EnvironmentService>> as Mocked<EnvironmentService>;
    findManyUsersOutputPortMock = {
      findMany: vitest.fn(),
    };
    loggerMock = {
      info: vitest.fn(),
    } as Partial<Mocked<ConsoleLogger>> as Mocked<ConsoleLogger>;
    populateUsersOutputPortMock = {
      populateUsers: vitest.fn(),
    };
    updateManyUsersOutputPortMock = {
      updateMany: vitest.fn(),
    };

    superAdminListFixture = {
      email: 'superadmin@example.com',
      name: 'Super Admin',
    };

    environmentFixture = {
      superAdminList: [superAdminListFixture],
    } as Partial<Environment> as Environment;

    environmentServiceMock.getEnvironment.mockReturnValueOnce(
      environmentFixture,
    );

    vitest.mocked(ConsoleLogger).mockReturnValueOnce(loggerMock);

    seedSuperAdminUsersInputPort = new SeedSuperAdminUsersInputPort(
      environmentServiceMock,
      findManyUsersOutputPortMock,
      populateUsersOutputPortMock,
      updateManyUsersOutputPortMock,
    );
  });

  describe('.seedSuperAdminUsers', () => {
    describe('when called, and findManyUsersOutputPort.findMany() returns empty array', () => {
      let result: unknown;

      beforeAll(async () => {
        findManyUsersOutputPortMock.findMany.mockResolvedValueOnce([]);

        result = await seedSuperAdminUsersInputPort.seedSuperAdminUsers();
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call logger.info()', () => {
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenCalledWith(
          `Seeding super admin users: ${superAdminListFixture.email}`,
        );
        expect(loggerMock.info).toHaveBeenCalledWith(
          `Found super admin users to seed: ${superAdminListFixture.email}`,
        );
      });

      it('should call findManyUsersOutputPort.findMany()', () => {
        const expected: UserFindQuery = {
          email: [superAdminListFixture.email],
        };

        expect(
          findManyUsersOutputPortMock.findMany,
        ).toHaveBeenCalledExactlyOnceWith(expected);
      });

      it('should call populateUsersOutputPort.populateUsers()', () => {
        expect(
          populateUsersOutputPortMock.populateUsers,
        ).toHaveBeenCalledExactlyOnceWith([superAdminListFixture]);
      });

      it('should call updateManyUsersOutputPort.updateMany()', () => {
        const expected: UserUpdateQuery = {
          findQuery: {
            email: [superAdminListFixture.email],
          },
          setQuery: {
            role: 'admin',
          },
        };

        expect(
          updateManyUsersOutputPortMock.updateMany,
        ).toHaveBeenCalledExactlyOnceWith(expected);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
