import { User } from '@academyjs/backend-auth-domain';
import {
  EnvironmentService,
  SuperAdminUser,
} from '@academyjs/backend-auth-env';
import { inject, injectable } from 'inversify';

import {
  FindManyUsersOutputPort,
  findManyUsersOutputPortSymbol,
} from '../output/FindManyUsersOutputPort';
import {
  PopulateUsersOutputPort,
  populateUsersOutputPortSymbol,
} from '../output/PopulateUsersOutputPort';

@injectable()
export class SeedSuperAdminUsersInputPort {
  readonly #findManyUsersOutputPort: FindManyUsersOutputPort;
  readonly #populateUsersOutputPort: PopulateUsersOutputPort;
  readonly #superAdminList: SuperAdminUser[];

  constructor(
    @inject(EnvironmentService) environmentService: EnvironmentService,
    @inject(findManyUsersOutputPortSymbol)
    findManyUsersOutputPort: FindManyUsersOutputPort,
    @inject(populateUsersOutputPortSymbol)
    populateUsersOutputPort: PopulateUsersOutputPort,
  ) {
    this.#findManyUsersOutputPort = findManyUsersOutputPort;
    this.#populateUsersOutputPort = populateUsersOutputPort;
    this.#superAdminList = environmentService.getEnvironment().superAdminList;
  }

  public async seedSuperAdminUsers(): Promise<void> {
    const userEmails: string[] = this.#superAdminList.map(
      (user: SuperAdminUser) => user.email,
    );

    const existingUsers: User[] = await this.#findManyUsersOutputPort.findMany({
      email: userEmails,
      id: [],
    });

    const nonExistingSuperAdminUserList: SuperAdminUser[] =
      this.#superAdminList.filter(
        (superAdminUser: SuperAdminUser) =>
          !existingUsers.some(
            (existingUser: User) => existingUser.email === superAdminUser.email,
          ),
      );

    if (nonExistingSuperAdminUserList.length === 0) {
      return;
    }

    await this.#populateUsersOutputPort.populateUsers(
      nonExistingSuperAdminUserList,
    );
  }
}
