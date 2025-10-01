import {
  EnvironmentService,
  SuperAdminUser,
} from '@academyjs/backend-auth-env';
import { inject, injectable } from 'inversify';

import {
  PopulateUsersOutputPort,
  populateUsersOutputPortSymbol,
} from '../output/PopulateUsersOutputPort';

@injectable()
export class SeedSuperAdminUsersInputPort {
  readonly #populateUsersOutputPort: PopulateUsersOutputPort;
  readonly #superAdminList: SuperAdminUser[];

  constructor(
    @inject(EnvironmentService) environmentService: EnvironmentService,
    @inject(populateUsersOutputPortSymbol)
    populateUsersOutputPort: PopulateUsersOutputPort,
  ) {
    this.#populateUsersOutputPort = populateUsersOutputPort;
    this.#superAdminList = environmentService.getEnvironment().superAdminList;
  }

  public async seedSuperAdminUsers(): Promise<void> {
    await this.#populateUsersOutputPort.populateUsers(this.#superAdminList);
  }
}
