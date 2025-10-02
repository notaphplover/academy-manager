import { User, UserUpdateQuery } from '@academyjs/backend-auth-domain';
import {
  EnvironmentService,
  SuperAdminUser,
} from '@academyjs/backend-auth-env';
import { ConsoleLogger, Logger } from '@inversifyjs/logger';
import { inject, injectable } from 'inversify';

import {
  FindManyUsersOutputPort,
  findManyUsersOutputPortSymbol,
} from '../output/FindManyUsersOutputPort';
import {
  PopulateUsersOutputPort,
  populateUsersOutputPortSymbol,
} from '../output/PopulateUsersOutputPort';
import {
  UpdateManyUsersOutputPort,
  updateManyUsersOutputPortSymbol,
} from '../output/UpdateManyUsersOutputPort';

const BETTER_AUTH_ADMIN_ROLE: string = 'admin';

@injectable()
export class SeedSuperAdminUsersInputPort {
  readonly #findManyUsersOutputPort: FindManyUsersOutputPort;
  readonly #logger: Logger;
  readonly #populateUsersOutputPort: PopulateUsersOutputPort;
  readonly #superAdminList: SuperAdminUser[];
  readonly #updateManyUsersOutputPort: UpdateManyUsersOutputPort;

  constructor(
    @inject(EnvironmentService) environmentService: EnvironmentService,
    @inject(findManyUsersOutputPortSymbol)
    findManyUsersOutputPort: FindManyUsersOutputPort,
    @inject(populateUsersOutputPortSymbol)
    populateUsersOutputPort: PopulateUsersOutputPort,
    @inject(updateManyUsersOutputPortSymbol)
    updateManyUsersOutputPort: UpdateManyUsersOutputPort,
  ) {
    this.#findManyUsersOutputPort = findManyUsersOutputPort;
    this.#logger = new ConsoleLogger('SeedSuperAdminUsersInputPort');
    this.#populateUsersOutputPort = populateUsersOutputPort;
    this.#superAdminList = environmentService.getEnvironment().superAdminList;
    this.#updateManyUsersOutputPort = updateManyUsersOutputPort;
  }

  public async seedSuperAdminUsers(): Promise<void> {
    const userEmails: string[] = this.#superAdminList.map(
      (user: SuperAdminUser) => user.email,
    );

    this.#logger.info(`Seeding super admin users: ${userEmails.join(', ')}`);

    const existingUsers: User[] = await this.#findManyUsersOutputPort.findMany({
      email: userEmails,
    });

    const nonExistingSuperAdminUserList: SuperAdminUser[] =
      this.#superAdminList.filter(
        (superAdminUser: SuperAdminUser) =>
          !existingUsers.some(
            (existingUser: User) => existingUser.email === superAdminUser.email,
          ),
      );

    if (nonExistingSuperAdminUserList.length === 0) {
      this.#logger.info('Super admin users already seeded. No action needed.');
      return;
    }

    const nonExistingSuperAdminUserEmailList: string[] =
      nonExistingSuperAdminUserList.map(
        (superAdminUser: SuperAdminUser): string => superAdminUser.email,
      );

    this.#logger.info(
      `Found super admin users to seed: ${nonExistingSuperAdminUserEmailList.join(', ')}`,
    );

    await this.#populateUsersOutputPort.populateUsers(
      nonExistingSuperAdminUserList,
    );

    const userUpdateQuery: UserUpdateQuery = {
      findQuery: {
        email: nonExistingSuperAdminUserEmailList,
      },
      setQuery: {
        role: BETTER_AUTH_ADMIN_ROLE,
      },
    };

    await this.#updateManyUsersOutputPort.updateMany(userUpdateQuery);
  }
}
